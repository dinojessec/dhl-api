const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');
const addressModel = require('../models/address-model');
const fatherModel = require('../models/parent-model');
const motherModel = require('../models/parent-model');
const educationModel = require('../models/education-model');

// add :ID as part of the route to specify what student needed to pull up
router.get('/:id', (req, res) => {
  const searchID = req.params.id;
  console.log('paramsss', searchID);
  // res.json({ searchID });
  studentModel
    .getStudent(searchID)
    .then((studentQuery) => {
      console.log(studentQuery);
      res.json({ info: studentQuery, pdsID: searchID });
      // const studentStrand = studentQuery[0].strandID;
      // strandModel.getStudentStrand(studentStrand).then((studentStrandQuery) => {
      //   const strandVal = studentStrandQuery[0].strandName;
      //   res.json({ info: studentQuery, strand: strandVal, pdsID: searchID });
      // });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/', (req, res) => {
  const params = req.body;
  // console.log(params);

  studentModel.updateStudent(params).then((val) => {
    console.log('update student', val);
  });
  // const addressSql = await addressModel.updateAddress(params).then(val => val);
  // const fatherSql = await fatherModel.updateFather(params).then(val => val);
  // const motherSql = await motherModel.updateMother(params).then(val => val);
  // const educationSql = await educationModel.updateEducation(params).then(val => val);
  // console.log('student query', studentSql);
  // console.log(addressSql);
  // console.log(fatherSql);
  // console.log(motherSql);
  // console.log(educationSql);
});

module.exports = router;
