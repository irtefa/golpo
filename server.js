var http = require('http');
var fs = require('fs');

var server = http.createServer().listen(8000);

server.on('request', function(request, response) {
  var newFile = fs.createWriteStream('test.txt');
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;

  request.pipe(newFile);

  request.on('data', function(chunk) {
    uploadedBytes += chunk.length;
    var progress = (uploadedBytes / fileBytes) * 100;
    response.write("progress: " + parseInt(progress,10) + "%\n");
  });

  request.on('end', function() {
    response.end('upladed!');
  })
})
