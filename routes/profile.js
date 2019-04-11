const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');
const addressModel = require('../models/address-model');
const fatherModel = require('../models/parent-model');
const motherModel = require('../models/parent-model');
const educationModel = require('../models/education-model');

router.get('/:userID', (req, res) => {
  const { roleID } = req;
  if (roleID >= 1) {
    const userID = req.params.userID;
    studentModel
      .getStudent(userID)
      .then((studentQuery) => {
        // console.log(studentQuery);

        const studentStrand = studentQuery[0].strandID;
        strandModel.getStudentStrand(studentStrand).then((studentStrandQuery) => {
          const strandResult = studentStrandQuery[0].strandName;
          console.log('asjkdfhljahd', studentStrandQuery);
          console.log('strand val', strandResult);
          res.json({
            info: studentQuery,
            strandResult,
            userID,
            roleID,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// still pending. update student info still not working
router.put('/', (req, res) => {
  const params = req.body;
  // console.log(params);

  studentModel.updateStudent(params).then((profileTab) => {
    const profileVal = profileTab;
    console.log(profileVal);
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

// router.get('/:id/strand', (req, res) => {
//   strandModel.generateStrand().then((strandModelResult) => {
//     const strandData = strandModelResult;
//     console.log('test', strandData);
//     // res.json({ strandData });
//   });
// });

router.put('/strand/', (req, res) => {
  const params = req.body;
  console.log(params);
});

module.exports = router;
