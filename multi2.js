var redis = require('redis');
var client = redis.createClient(),
	multi;

multi = client.multi();
multi.incr('i1', redis.print);
multi.incr('i2', redis.print);

client.mset('i1', 100, 'i2', 1, redis.print);

multi.exec(function (err, replies) {
	console.log(replies);
});

multi.exec(function (err, replies) {
	console.log(replies);
	client.quit();
});