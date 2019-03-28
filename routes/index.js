const express = require('express');

const router = express.Router();

const strandModel = require('../models/strand-model');

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
  strandModel.generateStrand().then((strandModelResult) => {
    const strandData = strandModelResult;
    res.json({ strandData });
  });
});

module.exports = router;
