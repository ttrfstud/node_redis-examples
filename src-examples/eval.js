var redis = require('redis');
var client = redis.createClient();

redis.debug_mode = true;

client.eval('return 100.5', 0, function (err, res) {
	console.dir(err);
	console.dir(res);
});

client.eval(['return 100.5', 0], function (err, res) {
	console.dir(err);
	console.dir(res);
});