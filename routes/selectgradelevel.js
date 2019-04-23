const express = require('express');

const router = express.Router();

const studentModel = require('../models/student-model');

router.put('/', (req, res) => {
  const params = req.body;
  const { userID } = req;
  console.log(params);
  console.log(userID);
  studentModel
    .updateGradeLevel(params, userID)
    .then((response) => {
      res.json({ message: 'update grade level' });
      console.log('response', response);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
