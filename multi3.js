var redis = require('redis');
var client = redis.createClient();

client.multi([
	['mget', 'multifoo', 'multibar', redis.print],
	['incr', 'multifoo'],
	['incr', 'multibar']
]).exec(function (err, replies) {
	console.log(replies);
	client.quit();
});