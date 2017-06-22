var net = require('net');

var client = net.connect({port: 8080}, function() {
	console.log('连接到服务器');  
});

client.on('data', function(data) {
	console.log(data.toString());
	client.end();
});

client.on('end', function() { 
	console.log('断开与服务器的连接');
});