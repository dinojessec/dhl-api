const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');
const studentModel = require('../models/student-model');

router.get('/strand', (req, res) => {
  const { roleID } = req;
  if (roleID >= 2) {
    strandModel.generateStrand().then((strandModelResult) => {
      const strandData = strandModelResult;
      res.json({ strandData });
    });
  } else { res.json({ message: 'access denied' }); }
});

router.post('/strand', (req, res) => {
  const params = req.body;
  const { roleID } = req;
  if (params !== ' ') {
    if (roleID >= 2) {
      strandModel.addStrand(params).then((response) => {
        if (response !== 'undefined') {
          console.log(response);
        } else {
          console.log('add strand response error');
        }
      });
    }
  }
});

router.put('/strand', (req, res) => {
  const params = req.body;
  console.log(params);
  strandModel.removeStrand(params).then((response) => {
    if (response !== 'undefined') {
      console.log(response);
    } else {
      console.log('update strand error');
    }
  });
});

router.get('/student', (req, res) => {
  const { roleID } = req;
  if (roleID < 2) {
    console.log(`user notallowed to access`);
  } else {
    studentModel.getAllStudent().then(response => {
      console.log(response);
      res.json({ response });
    })
  }
});

module.exports = router;
