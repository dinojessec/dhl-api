const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');

router.get('/strand', (req, res) => {
  strandModel.generateStrand().then((strandModelResult) => {
    const strandData = strandModelResult;
    res.json({ strandData });
  });
});

router.post('/strand', (req, res) => {
  const params = req.body;
  // console.log(params);
  strandModel.addStrand(params).then((response) => {
    if (response !== 'undefined') {
      console.log(response);
    } else {
      console.log('add strand response error');
    }
  });
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

module.exports = router;
