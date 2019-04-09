const express = require('express');

const router = express.Router();

const studentModel = require('../models/student-model');

router.put('/', (req, res) => {
  const params = req.body;
  console.log(params);
  studentModel
    .updateGradeLevel(params)
    .then((response) => {
      console.log(response);
      res.json({ message: 'updated grade level' });
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
