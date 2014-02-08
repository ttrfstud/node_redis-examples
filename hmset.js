var redis = require('redis');
var client = redis.createClient();

client.hmset('keyy', {
	'01234' : 'abc',
	'some manner of key' : 'a type of value'
});

client.hgetall('keyy', function (err, props) {
	console.dir(props);
	client.end();
});