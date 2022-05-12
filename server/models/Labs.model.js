const mongoose = require('mongoose')

const LabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})

const LabModel = mongoose.model('labs', LabSchema)

module.exports = LabModel