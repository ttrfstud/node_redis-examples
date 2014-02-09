var client = require('redis').createClient(),
util = require('util');

client.monitor(function (err, res) {
	console.log('entering monitor mode');
	console.log('res?', res);
});

client.on('monitor', function (time, args) {
	console.log(time, ':', util.inspect(args));
});