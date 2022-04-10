const router = require('express').Router();
let Course = require('../models/Courses.model');

router.route('/').get((req,res) => {
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json('Error: ' + err))
});

//using this function instead of insertCourse function in index.js
router.route('/add').post((req,res) => {
    const name = req.body.name;
    const id = req.body.id;
    const description = req.body.description;

    const newCourse = new Course({
        name,
        id,
        description,
    });

    newCourse.save()
        .then(() => res.json('Course added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;