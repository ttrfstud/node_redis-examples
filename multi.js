var redis = require('redis');
var client = redis.createClient();
var set_size = 20;

client.sadd('bigset', 'member 1');
client.sadd('bigset', 'member 2');

while (set_size > 0) {
	client.sadd('bigset', 'member' + set_size);
	set_size -= 1;
}

client.multi().
	scard('bigset', function (err, val) { console.log('card is', val)}).
	smembers('bigset', function (err, obj) { console.dir(obj);}).
	keys('*', function (err, replies) {
		client.mget(replies, redis.print);
	}).
	dbsize().
	exec(function (err, replies) {
		console.log('multi got', replies.length, 'replies');
		replies.forEach(function (r, i) {
			console.log('reply', i, ':', r.toString());
		});
	});