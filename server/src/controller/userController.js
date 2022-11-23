const Auths = require('../model/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

async function getAllUsers(req, res) {
    try {
        let allUsers = await Auths.find({});
        res.json({
            data: allUsers
        });
    } catch (e) {
        res.json(e);
    }
}

async function newUser(req, res) {
    let newUser = req.body;
    try {
        await new Auths(newUser).save();
        res.json({
            mess: "added"
        })
    } catch (e) {
        res.json({
            err: e
        })
    }
}

async function deleteUser(req, res) {
    let userId = req.params.id;
    try {
        let user = await Auths.findOne({ _id: mongoose.Types.ObjectId(userId) });
        if (user) {
            await Auths.deleteOne({ _id: mongoose.Types.ObjectId(userId) })
            res.json({
                mess: `deleted ${userId}`
            })
        }
    } catch (e) {
        res.json(e);
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    newUser
}