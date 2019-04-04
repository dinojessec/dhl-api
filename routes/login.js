const express = require('express');
const jwt = require('jsonwebtoken');
const btoa = require('btoa');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('secretKey');
const router = express.Router();

const userModel = require('../models/user-model');

router.get('/', (req, res) => {
  res.json({ message: 'test message' });
});

router.post('/', (req, res) => {
  const params = req.body;
  const userInputPassword = params.password;
  //   console.log(params);
  userModel
    .checkUsername(params)
    .then((val) => {
      const results = val.length;
      if (results === 0) {
        res.json({ message: 'username does not exist', status: 404 });
      }
      if (val) {
        const dbUserID = val[0].userID;
        const dbUsername = val[0].username;
        const dbPassword = val[0].password;
        const decryptPass = cryptr.decrypt(dbPassword);
        const atobPass = btoa(decryptPass);
        if (userInputPassword !== atobPass) {
          res.json({ message: 'Invalid password', status: 404 });
        } else {
          userModel.getPdsID(dbUserID).then((studentVal) => {
            const pdsVal = studentVal[0].personalDataSheetID;
            const payload = { subject: dbUsername };
            const token = jwt.sign(payload, 'thisSecretKey', { keyid: `${pdsVal}`, expiresIn: 60 });
            res.json({
              message: 'Login Success',
              id: pdsVal,
              userID: dbUserID,
              status: 200,
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
