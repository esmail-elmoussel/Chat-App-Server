const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating user schema
const userSchema = new Schema ({
    username: {
        type: String,
        required: [true,'Username is required!'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password is required!'],
        minlength: 1,
        maxlength: 100
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;