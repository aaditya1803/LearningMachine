const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const CourseModel = require('./models/Courses.model')

const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/learningmachine?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {useNewUrlParser: true} );
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection successful")
})

const coursesRouter = require('./routes/courses')
const userRouter = require('./routes/users')

app.use('/courses',coursesRouter)
//app.use('/users', userRouter)

//used to insert a new object into mongodb directly using model and save. moved from here to courses route
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

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
} )