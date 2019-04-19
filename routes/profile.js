const express = require('express');

const router = express.Router();

const userModel = require('../models/user-model');
const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');
const addressModel = require('../models/address-model');
const parentModel = require('../models/parent-model');
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
        if (studentStrand !== null) {
          strandModel.getStudentStrand(studentStrand).then((studentStrandQuery) => {
            const strandResult = studentStrandQuery[0].strandName;
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
  // const userID = req.params.userID;
  const params = req.body;
  // console.log('userID userID', userID);
  // console.log(params);

  studentModel.updateStudent(params).then((studentTable) => {

    addressModel.updateAddress(params).then(addressTable => {

      parentModel.updateFather(params).then(fatherTable => {

        parentModel.updateMother(params).then(motherTable => {

          educationModel.updateEducation(params).then(educationTable => {
            // console.log(studentTable);
            // console.log(addressTable);
            // console.log(fatherTable);
            // console.log(motherTable);
            // console.log(educationTable);
            res.json({ studentTable, addressTable, fatherTable, motherTable, educationTable });
          })
        })
      })
    })
  });

});

router.put('/:userID/approve', (req, res) => {
  const { userID } = req;
  const studentUserID = req.params.userID;

  userModel.getApprover(userID).then(response => {
    const username = response[0].username;
    console.log('username username', username);
    studentModel.approveStudent(username, studentUserID).then(response => {
      console.log(response);
      res.json({ response });
    })
  })
});


module.exports = router;
