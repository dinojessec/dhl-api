require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');

// connect to database
const mysql = require('mysql');
const indexRouter = require('./routes/index');

const app = express();

// CORS
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// custom codes below

const register = require('./routes/register');
const profile = require('./routes/profile');
const login = require('./routes/login');
const admin = require('./routes/admin');
const selectstrand = require('./routes/selectstrand');
const selectgradelevel = require('./routes/selectgradelevel');
const changePassword = require('./routes/change-password');
const user = require('./routes/user');
const payment = require('./routes/payment');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use((req, res, next) => {
  global.connection = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  connection.connect();

  next();
});

// token verifier
const verifier = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request. no token');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === null) {
    return res.status(401).send('Unauthorized request. null token');
  }
  const payload = jwt.verify(token, 'thisSecretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request. no payload');
  }
  req.userID = payload.userID;
  req.roleID = payload.roleID;
  next();
};

app.use('/api/v1/', indexRouter);
app.use('/api/v1/register', register);
app.use('/api/v1/profile', verifier, profile);
app.use('/api/v1/login', login);
app.use('/api/v1/admin', verifier, admin);
app.use('/api/v1/payment', verifier, payment);
app.use('/api/v1/selectstrand', verifier, selectstrand);
app.use('/api/v1/selectgradelevel', verifier, selectgradelevel);
app.use('/api/v1/changepassword', verifier, changePassword);
app.use('/api/v1/user', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
