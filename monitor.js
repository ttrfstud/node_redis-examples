var client = require('redis').createClient(),
util = require('util');
var client2 = require('redis').createClient();

client.monitor(function (err, res) {
	console.log('Entering monitor mode');
	console.log('!res is', res);

	client2.set('superkey', 'superval');
});

client.on('monitor', function (time, args) {
	console.log(time, ':', util.inspect(args));
	client.quit();
	client2.quit();
});

