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

router.route('/createtestlab').get((req,res) => {
    
    console.log('starting: ' + req.body.thelab)
    docker.createContainer({
        Image: 'hello-world'
        
    }).then(function(container) {
        return container.start();
    })
})

router.route('/stopacontainer').post((req,res) => {
    console.log('stopping: ' + req.body.thelabid) 
    if(docker.getContainer(req.body.thelabid)){
        docker.getContainer(req.body.thelabid).stop();
            docker.getContainer(req.body.thelabid).remove();
    }
})


router.route('/launchacontainer').post((req,res) => {
    
    console.log(req.body.uid + req.body.thelab)
    if(req.body.thelab==='vscode' && req.body.uid) {
        const containername = req.body.uid + '_' + req.body.thelab
        docker.createContainer({
            name: containername,
            Image: 'beneventsur/xubuntu:vscode-1.44.2',
            AttachStdin: true,
            //ExposedPorts: 
            Hostconfig: {
                PortBindings: {
                    '6080/tcp': [{
                        HostPort: '6080',
                    }],
                    '5901/tcp': [{
                        HostPort: '5901',
                    }]
                }
            }
        

        }).then(function(container) {
            return container.start();
        })
    }

    if(req.body.thelab==='ubuntu' && req.body.uid) {
        const containername = req.body.uid + '_' + req.body.thelab
        docker.createContainer({
            name: containername,
            Image: 'beneventsur/xubuntu:18.04-novnc',
            AttachStdin: true,
            //ExposedPorts: 
            Hostconfig: {
                PortBindings: {
                    '6080/tcp': [{
                        HostPort: '6080',
                    }],
                    '5901/tcp': [{
                        HostPort: '5901',
                    }]
                }
            }
        

        }).then(function(container) {
            return container.start();
        })
    }

    if(req.body.thelab==='android-studio' && req.body.uid) {
        const containername = req.body.uid + '_' + req.body.thelab
        docker.createContainer({
            name: containername,
            Image: 'xubuntu-android-studio',
            AttachStdin: true,
            //ExposedPorts: 
            Hostconfig: {
                PortBindings: {
                    '6080/tcp': [{
                        HostPort: '6080',
                    }],
                    '5901/tcp': [{
                        HostPort: '5901',
                    }]
                }
            }
        

        }).then(function(container) {
            return container.start();
        })
    }
    
})

module.exports = router;