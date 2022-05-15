const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('user', UsersSchema)

// Used to create indexes (means making an input unique) but not a better practice
// User.createIndexes();

module.exports = User;