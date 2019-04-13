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
        console.log(studentStrand);
        if (studentStrand !== null) {
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
        } else {
          res.json({ info: studentQuery, userID, roleID });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// still pending. update student info still not working
router.put('/:userID', (req, res) => {
  const userID = req.params.userID;
  const params = req.body;
  // console.log('userID userID', userID);
  // console.log(params);

  studentModel.updateStudent(params).then((studentTable) => {
    console.log(studentTable);
    res.json({ studentTable });
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
