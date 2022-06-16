var docker = new Docker();

var container = docker.getContainer('insert id here')
container.inspect(function (err, data) {
    console.log(data);
})
