const express = require('express');

const router = express.Router();

const roleModel = require('../models/role-model');

router.get('/:roleID', (req, res) => {
    const roleID = req.params.roleID;

    roleModel.generateRoleID(roleID).then(response => {
        console.log(response);
        res.json({ result: response });
    });
});

router.put('/', (req, res) => {
    const params = req.body;
    console.log(params);

    roleModel.updateRole(params).then(response => {
        console.log(response);
        res.json({ response });
    })
        .catch(e => {
            console.log('error on update role', e);
        })
});

module.exports = router;
