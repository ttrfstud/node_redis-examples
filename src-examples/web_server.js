var http = require('http');
var server;
var redis_client = require('redis').createClient();

server = http.createServer(function (request, response) {
	response.writeHead(200, {
		'Content-Type' : 'text/plain'
	});

	var redis_info, total_requests;

	redis_client.info(function (err, reply) {
		redis_info = reply;
	});

	redis_client.incr('requests', function (err, reply) {
		total_requests = reply;
	});

	redis_client.hincrby('ip', request.connection.remoteAddress, 1);
	redis_client.hgetall('ip', function (err, reply) {
		response.write('this page was generated after talking to redis\n\n' + 
			'Redis info:\n' + redis_info + '\n' +
			'Total requests: ' + total_requests + '\n\n' +
			'IP count: \n');
		Object.keys(reply).forEach(function (ip) {
			response.write('   ' + ip + ': ' + reply[ip] + '\n');
		});

		response.end();
	});
}).listen(80);