const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: String,
    admin: {
        type: Boolean,
        // default: false
    }
},
    { timestamps: true },
    { collection: 'auths' });

module.exports = mongoose.model('Auths', User);
