const mongoose = require('mongoose')

const UserSchema = new mongoose.schema({
    username: {
        type: String,
        required: true,
        unique:true,
        minlength:3,
    },
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel