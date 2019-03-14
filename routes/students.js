const express = require('express');

const router = express.Router();

const pdsModel = require('../models/personal-data-sheet-model');
const studentModel = require('../models/student-model');
const userModel = require('../models/user-model');

// GET /students
router.get('/', (req, res) => {
});

// POST /students
router.post('/', (req, res) => {
  const params = req.body;
  // console.log(test);
  pdsModel.generateID().then((pdsModelResult) => {
    const pdsId = pdsModelResult;

    userModel.generateUserID(params).then((userModelResult) => {
    const userId = userModelResult;
    
      studentModel.add(pdsId, userId, params).then((result) => {
        const resultData = result;
        console.log(resultData);

      });
    });
  });
});

module.exports = router;
