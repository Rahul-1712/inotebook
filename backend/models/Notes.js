const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        // this is used as a foreign key with reference to user schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General',
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('notes', NotesSchema)