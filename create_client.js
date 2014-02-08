var redis = require('redis'),
	client = redis.createClient(null, null, {detect_buffers: true});

client.set('foo_rand', 'OK', function () {
	console.log('set');
});

client.get('foo_rand', function (err, reply) {
	console.log(reply);
});

client.get(new Buffer('foo_rand'), function (err, reply) {
	console.log(reply);
	client.end();
});
