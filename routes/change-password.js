const express = require('express');

const router = express.Router();

const passwordModel = require('../models/change-password');

router.put('/', (req, res, next) => {
  const params = req.body;
  passwordModel
    .changePassword(params)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
