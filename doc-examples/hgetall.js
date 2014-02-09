var redis = require('redis');
var client = redis.createClient();

client.hmset('hosts', 'mjr', 1, 'another', 23, 'home', 1234);
client.hgetall('hosts', function (err, obj) {
	console.dir(obj);
	client.end();
});