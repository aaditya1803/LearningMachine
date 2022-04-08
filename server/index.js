const express = require('express')
const app = express()
const mongoose = require('mongoose')
const CourseModel = require('./models/Courses')

mongoose.connect('mongodb://localhost:27017/learningmachine?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {useNewUrlParser: true} );

app.get('/insertCourse', async (req, res) => {
    const course = new CourseModel({ name: "course2", id: 2, description: "this is a sample desc"});
    await course.save();
    res.send('Inserted');
})

app.get('/listCourse', async (req, res) => {
    CourseModel.find({}, (err,result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () =>{
    console.log('you are connected')
} )