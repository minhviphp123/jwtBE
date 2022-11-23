const mongoose = require('mongoose');
const User = require('../model/userModel');

function getTopDoctor(limit) {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await User.find({ role: 'Doctor' }).sort({ createdAt: -1 }).limit(limit);
            resolve({
                errCode: 0,
                users: users
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    getTopDoctor
}