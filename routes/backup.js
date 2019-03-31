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

//   res.json({ params });
// });

router.post('/', (req, res) => {
  const params = req.body;
  console.log(params);
  const pdsQuery = personalDataSheetModel.generatePdsID();
  const userQuery = userModel.generateUserID(params);

  connection.beginTransaction((err) => {
    if (err) {
      console.log('transaction error', err);
    } else {
      connection.query(pdsQuery, (pdsErr, pdsResult) => {
        if (pdsErr) {
          console.log(pdsErr);
        } else {
          const pdsID = pdsResult.insertId;

          connection.query(userQuery, (userErr, userResult) => {
            console.log(userErr);
            console.log(userResult);
            if (userErr) {
              res.json({ message: 'User Query error' });
              connection.rollback();
            } else {
              const userID = userResult.insertId;
              console.log(userID);

              const studentQuery = studentModel.addStudent(params, pdsID, userID);
              connection.query(studentQuery, (studentErr, studentResult, fields) => {
                if (studentErr) {
                  console.log(studentErr);
                  res.json({ message: 'Student Query error' });
                  connection.rollback();
                } else {
                  console.log(studentResult);
                  const studentID = studentResult.insertId;
                  console.log(studentID);

                  const fatherQuery = parentModel.addFather(pdsID);
                  connection.query(fatherQuery, (fatherErr, fatherResult) => {
                    if (fatherErr) {
                      res.json({ message: 'Father Query error' });
                      connection.rollback();
                    } else {
                      const fatherID = fatherResult.insertId;
                      console.log(fatherID);

                      const motherQuery = parentModel.addMother(pdsID);
                      connection.query(motherQuery, (motherErr, motherResult) => {
                        if (motherErr) {
                          res.json({ message: 'Mother Query error' });
                          connection.rollback();
                        } else {
                          const motherID = motherResult.insertId;
                          console.log(motherID);

                          const addressQuery = addressModel.addAddress(pdsID);
                          connection.query(addressQuery, (addressErr, addressResult) => {
                            if (addressErr) {
                              connection.rollback();
                              res.json({ message: 'Address Query error' });
                            } else {
                              const addressID = addressResult.insertId;
                              console.log(addressID);

                              const educationQuery = educationModel.addEducation(pdsID);
                              connection.query(educationQuery, (educationErr, educationResult) => {
                                if (educationErr) {
                                  res.json({ message: 'Education Query error' });
                                  connection.rollback();
                                } else {
                                  res.json({
                                    message: 'Account Created. Please log-in to your account',
                                  });
                                  connection.commit();
                                  const educationID = educationResult.insertId;
                                  console.log(educationID);
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
    }
  });
  // end of line
});

module.exports = router;
