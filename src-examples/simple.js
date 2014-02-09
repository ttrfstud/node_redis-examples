var redis = require('redis');
var client = redis.createClient();

client.on('error', function (err) {
	console.log('error event - ', client.host, ':', client.port, '-', err);
});

client.set('string key', 'string val', redis.print);
client.hset('hash key0', 'hash test 1', 'some value', redis.print);
client.hset(['hash key0', 'hash test 2', 'some other value'], redis.print);

client.hkeys('hash key0', function (err, replies) {
	if (err) {
		return console.error('error response -', err);
	}

	console.log('replies length', replies.length);
	replies.forEach(function (reply, i) {
		console.log(i, ': _ ', reply);
	});
});

client.quit(function (err, res) {
	console.log('exiting from quit command');
});