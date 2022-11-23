const jwt = require('jsonwebtoken');
const secretKey = 'eusKey';
// const Auths = require('../model/userModel');
const mongoose = require('mongoose');

function verifyToken(req, res, next) {
    try {
        const accessToken = req.headers.token.split(" ")[1];

        if (accessToken) {
            let user = jwt.verify(accessToken, secretKey);
            if (user) {
                req.user = user
                next();
            } else {
                return res.json({ mess: 'user doesnot exist' })
            }
        } else {
            return res.json({ mess: 'Invalid Token' })
        }
    } catch (e) {
        return res.json({ err: e });
    }
}

function checkRole(req, res, next) {
    try {
        const accessToken = req.headers.token.split(" ")[1];
        if (accessToken) {
            let user = jwt.verify(accessToken, secretKey);
            console.log(user);
            if (user.admin === true) {
                req.user = user;
                return next();
            }
            else {
                if (user._id === req.params.id) {
                    return next();
                }
                return res.json({ mess: 'You arenot allow to do that' })
            }
        } else {
            return res.json({ mess: 'Invalid Token' })
        }
    } catch (e) {
        res.json({
            err: e
        })
    }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXVzIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2Njg4NTk2MzR9.-IjWeoB9wHct-bzNz9yvgU8R9RkDxpTRafQF2GRw4Ag

module.exports = {
    verifyToken,
    checkRole
}