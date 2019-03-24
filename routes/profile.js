const express = require('express');

const router = express.Router();

const profileModel = require('../models/profile-model');

router.get('/', (req, res, next) => {
  profileModel
    .getStudentInfo()
    .then((studentQuery) => {
      // console.log(studentQuery);
      res.json({ studentQuery });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
