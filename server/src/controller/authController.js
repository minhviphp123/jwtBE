const Auths = require('../model/userModel');
const jwt = require('jsonwebtoken');
const secretKey = 'eusKey';

async function registerUser(req, res) {
    let newData = req.body;
    try {
        //save
        let newUser = await new Auths(newData);
        await newUser.save();
        res.status(200).json({
            mess: 'added'
        })
    } catch (e) {
        res.status(500).json({
            mess: 'err',
            detail: e
        })
    }
}

function generateAccessToken(user) {
    try {
        const accessToken = jwt.sign({
            _id: user._id,
            name: user.name,
            admin: user.admin
        }, secretKey);

        return accessToken;
    } catch (e) {
        return e;
    }
}

async function loginUser(req, res) {
    console.log('from authCtrl', req.body);
    let { name, password } = req.body;
    console.log(req.body);
    if (!name || !password) {
        return res.json({
            mess: 'incomplete information'
        })
    }
    try {
        let user = await Auths.findOne({ name: name });
        if (!user) {
            res.json({
                mess: 'user doesnot exist'
            })
        } else {
            if (user.password === password) {
                const accessToken = generateAccessToken(user);
                res.cookies = ("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                res.json({
                    mess: 'valid',
                    accessToken: accessToken
                })
            } else {
                res.json({
                    mess: 'wrong pw'
                })
            }
        }
    } catch (e) {
        res.json(e);
    }
}

async function refreshToken() {
    const refreshToken = req.cookies.refreshToken;

}

module.exports = {
    registerUser,
    loginUser,
    refreshToken
}