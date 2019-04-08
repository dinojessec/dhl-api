const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');

router.get('/', (req, res) => {
  strandModel
    .generateStrand()
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/', (req, res) => {
  const params = req.body;
  //   console.log(params);
  strandModel.updateStudentStrand(params).then((result) => {
    console.log(result);
    res.json({ message: 'updated strand' });
  });
});

module.exports = router;
