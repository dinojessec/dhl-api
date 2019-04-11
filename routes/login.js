const express = require('express');
const jwt = require('jsonwebtoken');
const atob = require('atob');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');
const router = express.Router();

const userModel = require('../models/user-model');

router.get('/', (req, res) => {
  res.json({ message: 'test message' });
});

router.post('/', (req, res) => {
  const params = req.body;
  // console.log(params);
  userModel
    .checkUsername(params)
    .then((val) => {
      const results = val.length;
      if (results === 0) {
        res.json({ message: 'username does not exist', status: 404 });
      }
      if (val) {
        console.log('check user value', val);
        const dbUserID = val[0].userID;
        const dbUsername = val[0].username;
        const dbPassword = val[0].password;
        const dbRoleID = val[0].roleID;
        const decryptPass = cryptr.decrypt(dbPassword);
        const atobPass = atob(decryptPass);
        if (params.password !== atobPass) {
          res.json({ message: 'Invalid password', status: 404 });
        } else {
          userModel.getPdsID(dbUserID).then((studentVal) => {
            const pdsVal = studentVal[0].personalDataSheetID;
            const payload = {
              userID: dbUserID,
              roleID: dbRoleID
            };
            const token = jwt.sign(payload, 'thisSecretKey', { expiresIn: '1d' });
            res.json({
              username: dbUsername,
              userID: dbUserID,
              token,
            });
          });
        }
      }
    })
    .catch((err) => {
      console.log('query error', err);
    });
});

module.exports = router;
