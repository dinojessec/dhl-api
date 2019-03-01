const express = require('express');

const router = express.Router();

// const pdsModel = require('../models/personal-data-sheet-model');
// const studentModel = require('../models/student-model');
// const userModel = require('../models/user-model');
const strandModel = require('../models/strand-model');


// function getPdsID() {
//   pdsModel.generateID().then((response) => {
//     return response;
//   });
// }

// function sendResponse(success, message) {
//   return { success, message };
// }

// GET /students
router.get('/', (req, res) => {
  // const strandDataList = res.json();
  // strandDataList.then((data) => { return data; });
  const testData = strandModel.getStrandList;
  console.log(testData);
});

// POST /students
// router.post('/', (req, res) => {
//   const params = req.body;
//   const pdsId = pdsModel.generateID;
//   const studentID = studentModel.generateStudent(pdsId, params);

//   Promise.all([
//     pdsId,
//     studentID,
//   ]).then(data => console.log(data))
//   // console.log('params');
//   console.log(params);
//   console.log(studentID);
// });

module.exports = router;
