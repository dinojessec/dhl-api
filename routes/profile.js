const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');

// add :ID as part of the route to specify what student needed to pull up
router.post('/', (req, res) => {
  studentModel
    .getStudent()
    .then((studentQuery) => {
      // console.log(studentQuery);
      res.json({ studentQuery });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/', (req, res) => {
  const params = req.body;

  async function updateProfile() {
    const studentSql = await studentModel.update(params).then(val => val);
    console.log('studentSql');
    console.log(studentSql);
    console.log('studentSql');
  }
  updateProfile();
});

router.get('/', (req, res) => {
  strandModel.generateStrand().then((strandModelResult) => {
    const strandData = strandModelResult;
    res.json({ strandData });
  });
});

module.exports = router;
