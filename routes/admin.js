const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');

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

module.exports = router;
