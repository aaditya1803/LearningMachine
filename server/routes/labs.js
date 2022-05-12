const router = require('express').Router();
let Lab = require('../models/Labs.model');

router.route('/').get((req,res) => {
    Lab.find()
        .then(lab => res.json(lab))
        .catch(err => res.status(400).json('Error: ' + err))
});

//use the following routes to access lab list, launch labs maybe and more
router.route('/add').post((req,res) => {
    const name = req.body.name;
    const desc = req.body.desc;

    const newLab = new Lab({
        name,
        desc,
    });

    newLab.save()
        .then(() => res.json('Lab added'))
        .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;