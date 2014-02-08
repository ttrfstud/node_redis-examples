var redis = require('redis'),
	client = redis.createClient();

client.set('foo_rand', 'some fantastic value');
client.get('foo_rand', function (err, reply) {
	console.log(reply.toString());
});

// client.quit();
client.end();