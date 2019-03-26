const express = require('express');

const router = express.Router();

const studentModel = require('../models/student-model');
const strandModel = require('../models/strand-model');

// GET /students
router.get('/', (req, res) => {
  strandModel.generateStrand().then((strandModelResult) => {
    const strandData = strandModelResult;
    res.json({ strandData });
  });
});

// POST /students
router.post('/', (req, res) => {
  const params = req.body;

  studentModel
    .add(params)
    .then((result) => {
      if (result !== 'undefined') {
        res.json({ message: 'success' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "fail. there's something wrong with the query" });
    });
});

module.exports = router;
