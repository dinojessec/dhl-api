const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');
const addressModel = require('../models/address-model');
const fatherModel = require('../models/parent-model');
const motherModel = require('../models/parent-model');
const educationModel = require('../models/education-model');

// add :ID as part of the route to specify what student needed to pull up
router.get('/:ID', (req, res) => {
  const searchID = req.params.ID;
  // console.log(searchID);
  // res.json({ searchID });
  studentModel
    .getStudent(searchID)
    .then((studentQuery) => {
      const studentStrand = studentQuery[0].strandID;
      strandModel.getStudentStrand(studentStrand).then((studentStrandQuery) => {
        const strandVal = studentStrandQuery[0].strandName;
        res.json({ info: studentQuery, strand: strandVal });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/', (req, res) => {
  const params = req.body;
  console.log(params);
  async function updateProfile() {
    const studentSql = await studentModel.updateStudent(params).then(val => val);
    // const addressSql = await addressModel.updateAddress(params).then(val => val);
    // const fatherSql = await fatherModel.updateFather(params).then(val => val);
    // const motherSql = await motherModel.updateMother(params).then(val => val);
    // const educationSql = await educationModel.updateEducation(params).then(val => val);
    console.log(studentSql);
    // console.log(addressSql);
    // console.log(fatherSql);
    // console.log(motherSql);
    // console.log(educationSql);
    // const update = Promise.all([studentSql, addressSql, fatherSql, motherSql, educationSql]);
    // return update;
  }
  updateProfile();
});

module.exports = router;
