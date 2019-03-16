const express = require('express');

const router = express.Router();

// const pdsModel = require('../models/personal-data-sheet-model');
// const studentModel = require('../models/student-model');
// const userModel = require('../models/user-model');
const strandModel = require('../models/strand-model');

// GET /students
router.get('/', (req, res) => {
  // console.log('test message');
  // res.json({ message: 'get request' });
  strandModel.generateStrand().then((strandModelResult) => {
    const strandData = strandModelResult;
    res.json({ strandData });
  });
});

// POST /students
router.post('/', (req, res) => {
  // const params = req.body;
  // // console.log(test);
  // pdsModel.generateID().then((pdsModelResult) => {
  //   const pdsId = pdsModelResult;
  //   // console.log(pdsId);
  //   userModel.generateUserID(params).then((userModelResult) => {
  //     const userId = userModelResult;
  //     // console.log(userId);
  //     studentModel.add(pdsId, userId, params).then((result) => {
  //       const resultData = result;
  //       console.log(pdsId);
  //       console.log(userId);
  //       console.log(resultData);

        // if (pdsId === true && userId === true && resultData === true) {
        //   res.json({ message: 'success' });
        // } else {
        //   res.json({ message: 'fail' });
        // }
      });
//     });
//   });
// });

module.exports = router;
