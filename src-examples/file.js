var redis = require('redis');
var client = redis.createClient();
var fs = require('fs');
var filename = 'file';

fs.readFile(filename, function (err, data) {
	if (err) throw err;
	console.log('Read', data.length, 'bytes from filesystem');

	client.set(filename, data, redis.print);
	client.get(filename, function (err, reply) {
		if (err) {
			console.log('Got error', err);
		} else {
			fs.writeFile('duplicate_' + filename, reply, function (err) {
				if (err) {
					console.log('error on write', err);
				} else {
					console.log('file written');
				}

				client.end();
			});
		}
	});
});