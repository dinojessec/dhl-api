const express = require('express');

const router = express.Router();

const userModel = require('../models/user-model');
const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');
const addressModel = require('../models/address-model');
const parentModel = require('../models/parent-model');
const educationModel = require('../models/education-model');
const voucherModel = require('../models/voucher-model');
const jhsModel = require('../models/jhs-grades');

// load strand list
router.get('/strand', (req, res) => {
  strandModel
    .generateStrand()
    .then((result) => {
      // console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:userID', (req, res) => {
  const { roleID } = req;
  if (roleID >= 1) {
    const userID = req.params.userID;
    studentModel
      .getStudent(userID)
      .then((studentQuery) => {
        // console.log(studentQuery);
        const studentStrand = studentQuery[0].strandID;
        if (studentStrand !== undefined) {
          strandModel.getStudentStrand(studentStrand).then((studentStrandQuery) => {
            const strandResult = studentStrandQuery[0];
            if (strandResult === undefined) {
              res.json({ info: studentQuery, userID, roleID });
            } else {
              res.json({
                info: studentQuery,
                strandResult,
                userID,
                roleID,
              });
            }
          });
        } else {
          console.log('failed get query on profile');
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
  const grades = params.grades;
  // console.log(grades);

  studentModel.updateStudent(params).then((studentTable) => {

    addressModel.updateAddress(params).then(addressTable => {

      parentModel.updateFather(params).then(fatherTable => {

        parentModel.updateMother(params).then(motherTable => {

          parentModel.updateGuardian(params).then(guardianTable => {

            educationModel.updateEducation(params).then(educationTable => {

              jhsModel.updateGrades(grades, params).then(jhsTable => {

                res.json({ studentTable, addressTable, fatherTable, motherTable, guardianTable, educationTable, jhsTable });
              })
            });
          });
        });
      });
    });
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

router.put('/student-payment/:userID', (req, res) => {
  const userID = req.params.userID;
  const data = req.body.data;
  studentModel.getPdsID(userID).then(response => {
    const pdsID = response[0].personalDataSheetID;
    educationModel.getSchoolType(pdsID).then(response => {
      const type = response[0].schoolType;
      voucherModel.updateVoucher(type, data, pdsID).then(response => {
        res.json({ response });
      });
    })
  })
});

router.get('/student-payment/:userID', (req, res) => {
  const userID = req.params.userID;

  studentModel.getPdsID(userID).then(response => {
    const pdsID = response[0].personalDataSheetID;
    voucherModel.getVoucher(pdsID).then(response => {
      const voucherRes = response[0];
      res.json({ voucherRes });
    });
  });
});


module.exports = router;
