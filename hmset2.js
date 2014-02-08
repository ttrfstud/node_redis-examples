var redis = require('redis');
var client = redis.createClient();

client.hmset('key', 'k1', 'v1', 'k2', 'v2');

client.hgetall('key', function (err, obj) {
	console.dir(obj);
	client.end();
});