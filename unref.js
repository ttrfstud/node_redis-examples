var redis = require('redis');
var client = redis.createClient();

client.unref();
client.set('you', 1);
client.set('you', 2);
client.set('you', 3);
client.set('you', 4);
client.get('you', function (err, value) {
	if (err) throw err;
	console.log(value);
});