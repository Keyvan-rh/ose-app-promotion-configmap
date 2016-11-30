var util = require('util');
var http = require('http');
var fs = require('fs');
var url = require('url');

var port = process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var PropertiesReader = require('properties-reader');

var server = http.createServer(function (req, res) {
   var request = url.parse(req.url, true);
   var action = request.pathname;
   console.log('kp:action '+action);
   req.on('data', function (data) {});
   req.on('end', function () {
      console.log("Invoked");
      var request = url.parse(req.url, true);
  	  var action = request.pathname;
      var properties = PropertiesReader('/etc/node-app/node-app.config');
      if (action == '/pic') {
     	var img = fs.readFileSync('./'+properties.get('imagename'));
     	res.writeHead(200, {'Content-Type': 'image/gif' });
     	res.end(img, 'binary');
  	  } else { 
      	res.writeHead(200, {'Content-Type': 'text/html'});
      	res.write('<html><head><title>'+ process.env.BACKGROUND_TITLE +'</title></head>');
      	res.write('<body bgcolor="' + properties.get('color') + '">');
      	res.write('<h1>' + process.env.BACKGROUND_MSG + '</h1>');
      	res.write('</body>');
      	res.end('\n');
      }
   });

});
console.log('Initializing Server on ' + ip + ':' + port);
server.listen(port,ip, function(){
   var address = server.address();
   console.log('Server running on ' + address.address + ':' + address.port);
});
