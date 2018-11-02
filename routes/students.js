const express = require('express');

const router = express.Router();
const studentModel = require('../models/student-model');
const pdsModel = require('../models/personal-data-sheet-model');
const userModel = require('../models/user-model');
const addressModel = require('../models/address-model');

function sendResponse(success, message) {
  return { success, message };
}

// GET /students
router.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

// POST /students
router.post('/', (req, res) => {
  try {
    pdsModel.generateID().then((dataSheetId) => {
      const pdsID = dataSheetId;

      // Adds address of student to DB
      if (typeof pdsID !== 'undefined') {
        addressModel.addAddress(req.body, pdsID);
      }

      // Adds student to DB
      userModel.addUser(req.body).then((userId) => {
        if (typeof pdsID !== 'undefined' && typeof userId !== 'undefined') {
          const addStudent = studentModel.create(req.body, pdsID, userId);
          addStudent.then((response) => {
            if (response.success) {
              res.json(sendResponse(response.success, response.message));
            } else {
              res.json(sendResponse(response.success, response.message));
            }
            res.end();
          });
        }
      });
    });
  } catch (e) {
    res.json(sendResponse(false, 'Unknown error occured'));
    res.end();
  }
});

module.exports = router;
