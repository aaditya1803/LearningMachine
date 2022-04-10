const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const CourseModel = mongoose.model('courses', CourseSchema)

module.exports = CourseModel