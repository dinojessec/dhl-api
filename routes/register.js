const express = require('express');

const router = express.Router();

const studentModel = require('../models/student-model');
const strandModel = require('../models/strand-model');
const personalDataSheetModel = require('../models/personal-data-sheet-model');
const userModel = require('../models/user-model');
const parentModel = require('../models/parent-model');
const addressModel = require('../models/address-model');
const educationModel = require('../models/education-model');

// GET /students
router.get('/', (req, res) => {
  strandModel.generateStrand().then((strandModelResult) => {
    const strandData = strandModelResult;
    res.json({ strandData });
  });
});

// POST /students
// router.post('/', (req, res) => {
//   const params = req.body;

//   studentModel
//     .add(params)
//     .then((result) => {
//       if (result !== 'undefined') {
//         res.json({ message: 'success' });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({ message: "fail. there's something wrong with the query" });
//     });
// });

router.post('/', (req, res) => {
  const params = req.body;

  const pdsQuery = personalDataSheetModel.generatePdsID();
  const userQuery = userModel.generateUserID(params);

  connection.beginTransaction((err) => {
    if (err) {
      console.log('transaction error', err);
    } else {
      connection.query(pdsQuery, (err, result) => {
        if (err) {
          console.log('pds query error', err);
        } else {
          const pdsID = result.insertId;

          connection.query(userQuery, (err, result) => {
            if (err) {
              console.log('user query error', err);
            } else {
              const userID = result.insertId;

              const studentQuery = studentModel.addStudent(params, pdsID, userID);
              connection.query(studentQuery, (err, result, fields) => {
                if (err) {
                  console.log('student query error', err);
                } else {
                  // const studentID = result.insertId;

                  const fatherQuery = parentModel.addFather(pdsID);
                  const motherQuery = parentModel.addMother(pdsID);
                  connection.query(fatherQuery, motherQuery, (err, result) => {
                    if (err) {
                      console.log('parent query error', err);
                    } else {
                      const addressQuery = addressModel.addAddress(pdsID);
                      connection.query(addressQuery, (err, result) => {
                        if (err) {
                          console.log('address query error', err);
                        } else {
                          const educationQuery = educationModel.addEducation(pdsID);
                          connection.query(educationQuery, (err, result) => {
                            if (err) {
                              connection.rollback();
                              console.log('education query error', err);
                            } else {
                              connection.commit();
                              console.log('success', result);
                              res.json({ message: 'pdsID', pdsID, fields });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  // end of line
});

module.exports = router;
