const mongoose = require('mongoose');

const md5 = require('md5');

const Schema = mongoose.Schema;
const collectionName = 'user';

let userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: collectionName
});


userSchema.statics.findByEmail = function(email){
    return this.findOne({ email: email }).select('firstname lastname email -_id')
};

userSchema.statics.findByEmailPassword = function(email, password) {
    return this.findOne({ email: email, password: md5(password) }).select('firstname lastname email -_id')
};

module.exports = mongoose.model(collectionName, userSchema, collectionName);