const express = require('express');

const router = express.Router();

const profileModel = require('../models/profile-model');
const strandModel = require('../models/strand-model');

// add :ID as part of the route to specify what student needed to pull up
router.get('/', (req, res) => {
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

router.get('/', (req, res) => {
  strandModel.generateStrand().then((strandModelResult) => {
    const strandData = strandModelResult;
    res.json({ strandData });
  });
});


module.exports = router;
