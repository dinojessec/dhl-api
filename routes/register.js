const express = require('express');

const router = express.Router();

const studentModel = require('../models/student-model');
const personalDataSheetModel = require('../models/personal-data-sheet-model');
const userModel = require('../models/user-model');
const parentModel = require('../models/parent-model');
const addressModel = require('../models/address-model');
const educationModel = require('../models/education-model');
const paymentModel = require('../models/payment-model');
const voucherModel = require('../models/voucher-model');
const documentModel = require('../models/document-model');
const uniformModel = require('../models/uniform-model');
const jhsModel = require('../models/jhs-grades');

// POST /students
router.post('/', (req, res) => {
  const params = req.body;

  const pdsQuery = personalDataSheetModel.generatePdsID();

  function userCheck() {
    return userModel.checkUsername(params).then(val => val);
  }

  userCheck().then((val) => {
    // console.log('check user', val);
    const numberOfUser = Object.keys(val);
    if (numberOfUser.length >= 1) {
      res.json({ message: 'Username already exists', status: 404 });
    } else {
      connection.beginTransaction((err) => {
        if (err) {
          console.log('transaction error', err);
        } else {
          connection.query(pdsQuery, (pdsErr, pdsResult) => {
            if (pdsErr) {
              console.log(pdsErr);
            } else {
              const pdsID = pdsResult.insertId;
              console.log('pdsID=', pdsID);

              const userQuery = userModel.generateUserID(params);
              connection.query(userQuery, (userErr, userResult) => {
                if (userErr) {
                  res.json({ message: 'User Query error', status: 404 });
                  connection.rollback();
                } else {
                  const userID = userResult.insertId;
                  console.log('userID=', userID);

                  const studentQuery = studentModel.addStudent(params, pdsID, userID);
                  connection.query(studentQuery, (studentErr, studentResult) => {
                    if (studentErr) {
                      console.log(studentErr);
                      res.json({ message: 'Student Query error', status: 404 });
                      connection.rollback();
                    } else {
                      const studentID = studentResult.insertId;
                      console.log('studentID=', studentID);

                      const fatherQuery = parentModel.addFather(pdsID);
                      connection.query(fatherQuery, (fatherErr, fatherResult) => {
                        if (fatherErr) {
                          res.json({ message: 'Father Query error', status: 404 });
                          connection.rollback();
                        } else {
                          const fatherID = fatherResult.insertId;
                          console.log('fatherID=', fatherID);

                          const motherQuery = parentModel.addMother(pdsID);
                          connection.query(motherQuery, (motherErr, motherResult) => {
                            if (motherErr) {
                              res.json({ message: 'Mother Query error', status: 404 });
                              connection.rollback();
                            } else {
                              const motherID = motherResult.insertId;
                              console.log('motherID', motherID);

                              const addressQuery = addressModel.addAddress(pdsID);
                              connection.query(addressQuery, (addressErr, addressResult) => {
                                if (addressErr) {
                                  connection.rollback();
                                  res.json({ message: 'Address Query error', status: 404 });
                                } else {
                                  const addressID = addressResult.insertId;
                                  console.log('addressID=', addressID);

                                  const educationQuery = educationModel.addEducation(pdsID);
                                  connection.query(
                                    educationQuery,
                                    (educationErr, educationResult) => {
                                      if (educationErr) {
                                        res.json({
                                          message: 'Education Query error',
                                          status: 404,
                                        });
                                        connection.rollback();
                                      } else {
                                        const educationID = educationResult.insertId;
                                        console.log('educationID=', educationID);

                                        const voucherQuery = voucherModel.addVoucher(
                                          pdsID,
                                        );
                                        connection.query(
                                          voucherQuery,
                                          (voucherErr, voucherResult) => {
                                            if (voucherErr) {
                                              connection.rollback();
                                              res.json({
                                                message: 'Voucher Query Error',
                                                status: 404,
                                              });
                                            } else {
                                              const voucherID = voucherResult.insertId;
                                              console.log('voucherID=', voucherID);
                                              const documentQuery = documentModel.addDocument(
                                                pdsID,
                                              );
                                              connection.query(
                                                documentQuery,
                                                (documentErr, documentResult) => {
                                                  if (documentErr) {
                                                    connection.rollback();
                                                    res.json({
                                                      message: 'Document query error',
                                                      status: 404,
                                                    });
                                                  } else {
                                                    const documentID = documentResult.insertId;
                                                    console.log(
                                                      'documentID=',
                                                      documentID,
                                                    );
                                                    const uniformQuery = uniformModel.addUniform(
                                                      pdsID,
                                                    );
                                                    connection.query(
                                                      uniformQuery,
                                                      (uniformErr, uniformResult) => {
                                                        if (uniformErr) {
                                                          connection.rollback();
                                                          res.json({
                                                            message:
                                                              'Uniform query error',
                                                            status: 404,
                                                          });
                                                        } else {
                                                          const uniformID = uniformResult.insertId;
                                                          console.log(
                                                            'uniformID=',
                                                            uniformID,
                                                          );
                                                          const jhsGradesQuery = jhsModel.addGrades(pdsID);
                                                          connection.query(jhsGradesQuery, (jhsErr, jhsResult) => {
                                                            if (jhsErr) {
                                                              connection.rollback();
                                                              res.json({
                                                                message:
                                                                  'Uniform query error',
                                                                status: 404,
                                                              });
                                                            } else {
                                                              const jhsGradesID = jhsResult.insertId;
                                                              console.log('jhs GradesID', jhsGradesID);

                                                              const guardianQuery = parentModel.addGuardian(pdsID);
                                                              connection.query(guardianQuery, (guardianErr, guardianResult) => {
                                                                if (guardianErr) {
                                                                  connection.rollback();
                                                                  res.json({
                                                                    message:
                                                                      'Uniform query error',
                                                                    status: 404,
                                                                  });
                                                                } else {
                                                                  const guardianID = guardianResult.insertId;
                                                                  console.log(guardianID);
                                                                  res.json({
                                                                    message:
                                                                      'Account Created. Please log-in to your account',
                                                                    status: 200,
                                                                  });
                                                                  connection.commit();
                                                                }
                                                              })
                                                            }
                                                          });
                                                        }
                                                      },
                                                    );
                                                  }
                                                },
                                              );
                                            }
                                          },
                                        );
                                      }
                                    },
                                  );
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              })
            }
          });
        }
      });
    }
  });
  // end of line
});

module.exports = router;
