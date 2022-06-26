const router = require('express').Router();
let Lab = require('../models/Labs.model');

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

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

router.route('/listcontainers').get((req,res) => {
    docker.listContainers(function (err, containers) {
        console.log(containers + err);
        res.send(containers)
    })
})

module.exports = router;