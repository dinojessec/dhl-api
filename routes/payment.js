const express = require('express');

const router = express.Router();

const paymentModel = require('../models/payment-model');

router.put('/', (req, res) => {
    const params = req.body;
    console.log(params);

    paymentModel.updateTuition(params).then(response => {
        res.json({ response, message: 'Fee updated' })
    })
});

module.exports = router;