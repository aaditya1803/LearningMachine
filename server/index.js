const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const CourseModel = require('./models/Courses.model')
const LabModel = require('./models/Labs.model')
//spawn function executes command in a new process
//exec function creates a new shell and executes the command
// The key difference between exec() and spawn() is how they return the data. As exec() stores all the output in a buffer, it is more memory intensive than spawn(), which streams the output as it comes.
// Generally, if you are not expecting large amounts of data to be returned, you can use exec() for simplicity. Good examples of use-cases are creating a folder or getting the status of a file. However, if you are expecting a large amount of output from your command, then you should use spawn(). A good example would be using command to manipulate binary data and then loading it in to your Node.js program.
const {exec, spawn} = require('child_process')

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
const labRouter = require('./routes/labs')


app.use('/courses',coursesRouter)
//app.use('/users', userRouter)
app.use('/labs', labRouter)

//used to insert a new object into mongodb directly using model and save. moved from here to courses route
app.get('/insertCourse', async (req, res) => {
    const course = new CourseModel({ name: "course3", id: 55, description: "uhhhhhhhhh"});
    await course.save();
    res.send('Inserted');
})

//test endpoint to list all running docker containers
app.get('/listcontainers', async (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker({socketPath: '/var/run/docker.sock'});
    docker.listContainers(function (err, containers) {
        console.log(containers + err);
        res.send(containers)
    })
})

app.get('/getcontainers', async (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker({socketPath: '/var/run/docker.sock'});
    docker.getContainer('1ee999dce4a5').inspect(function (err, data) {
        console.log(data + err);
        res.send(data)
    })
})

app.get('/stopallcontainers', async (req, res) => {
    var Docker = require('dockerode');
    var docker = new Docker({socketPath: '/var/run/docker.sock'});
    docker.listContainers(function(err,containers) {
        containers.forEach(function(containerInfo) {
            docker.getContainer(containerInfo.Id).stop();
        })
    })
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

app.get('/runcommand', (req,res) => {
    exec("cat /etc/os-release", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`Error: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
        res.send(`Stdout :${stdout}`)
    })
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
} )