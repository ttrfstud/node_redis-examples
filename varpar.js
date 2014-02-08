var client = require('redis').createClient();

var args = ['myzset', 1, 'one', 2, 'two', 3, 'three', 99, 'ninety-nine'];

client.zadd(args, function (err, response) {
	if (err) throw err;
	console.log('added', response, 'items');

	var args1 = ['myzset', '+inf', '-inf'];
	client.zrevrangebyscore(args1, function (err, response) {
		if (err) throw err;

		console.log('example1', response);
	});

	var max = 3, min = 1, offset = 1, count = 2;
	var args2 = ['myzset', max, min, 'WITHSCORES', 'LIMIT', offset, count];

	client.zrevrangebyscore(args2, function (err, response) {
		if (err) throw err;
		console.log('example2', response);

		client.quit();
	});
});