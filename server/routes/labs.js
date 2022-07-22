const router = require('express').Router();
let Lab = require('../models/Labs.model');

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});


var AssignedPorts = {
    '6081' : null,
    '6082' : null,
    '6083' : null,
    '6084' : null,
    '6085' : null,
}

var porter = (thelabid) => {
    console.log('lets assign some ports')
    for (var key in AssignedPorts ) {
        if(AssignedPorts[key] == thelabid && AssignedPorts[key] ) {
            return key
        }
    }
    for (var key in AssignedPorts) {
        if(AssignedPorts[key] == null ) {
            AssignedPorts[key] = thelabid
            return key
        }
    }
    return 0

}

router.route('/').get((req,res) => {
    console.log(porter())
        Lab.find()
        .then(lab => res.json(lab))
        .catch(err => res.status(400).json('Error: ' + err))
});


router.route('/stopacontainer').post((req,res) => {
    console.log('stopping: ' + req.body.thelabid) 
    if(docker.getContainer(req.body.thelabid)){
        for (var key in AssignedPorts) {
            if(AssignedPorts[key] == req.body.thelabid ) {
                AssignedPorts[key] = null
            }
        }
        docker.getContainer(req.body.thelabid).stop().then(function() {
            docker.getContainer(req.body.thelabid).remove();

        })
    }
})


router.route('/launchacontainer').post((req,res) => {
    
    const containername = req.body.uid + '_' + req.body.thelab

    //insert code that queries the port available
    portavailable = porter(containername)

    console.log(req.body.uid + req.body.thelab)
    if(req.body.thelab==='vscode' && req.body.uid && portavailable) {
        //const containername = req.body.uid + '_' + req.body.thelab
        res.send({containername:portavailable})

        docker.createContainer({
            name: containername,
            Image: 'beneventsur/xubuntu:vscode-1.44.2',
            AttachStdin: true,
            //ExposedPorts: 
            Hostconfig: {
                PortBindings: {
                    '6080/tcp': [{
                        HostPort: portavailable,
                    }],
                }
            }
        

        })
        .then(function(container) {
            //insert code that sends response to react with the port number assigned
            
            container.start();            
            
        })
    }

    if(req.body.thelab==='ubuntu' && req.body.uid && portavailable) {
        //const containername = req.body.uid + '_' + req.body.thelab
        res.send({containername:portavailable})

        docker.createContainer({
            name: containername,
            Image: 'beneventsur/xubuntu:18.04-novnc',
            AttachStdin: true,
            //ExposedPorts: 
            Hostconfig: {
                PortBindings: {
                    '6080/tcp': [{
                        HostPort: portavailable,
                    }],
                    
                }
            }
        

        }).then(function(container) {
            return container.start();
        })
    }

    if(req.body.thelab==='android-studio' && req.body.uid && portavailable) {
        //const containername = req.body.uid + '_' + req.body.thelab
        docker.createContainer({
            name: containername,
            Image: 'xubuntu-android-studio',
            AttachStdin: true,
            //ExposedPorts: 
            Hostconfig: {
                PortBindings: {
                    '6080/tcp': [{
                        HostPort: portavailable,
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


module.exports = router;