const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');
const addressModel = require('../models/address-model');
const fatherModel = require('../models/parent-model');
const motherModel = require('../models/parent-model');
const educationModel = require('../models/education-model');

// add :ID as part of the route to specify what student needed to pull up
router.get('/:pdsID', (req, res) => {
  const searchID = req.params.pdsID;
  res.json({ searchID });
  // studentModel
  //   .getStudent(searchID)
  //   .then((studentQuery) => {
  //     // console.log(studentQuery);
  //     res.json({ studentQuery });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.put('/', (req, res) => {
  const params = req.body;

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
