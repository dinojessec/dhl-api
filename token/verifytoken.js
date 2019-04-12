const express = require('express');
const verify = {
    profileVerifier(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request. no token');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('Unauthorized request. null token');
        }
        const payload = jwt.verify(token, 'thisSecretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request. no payload');
        }
        console.log(payload);
        req.userID = payload.userID;
        req.groupID = payload.groupID;
        // next();
    },
}

module.exports = verify;
