var redis = require('redis');
var client1 = redis.createClient();
var client2 = redis.createClient();
var client3 = redis.createClient();
var client4 = redis.createClient();

var msg_count = 0;

redis.debug_mode = false;

client1.on('psubscribe', function (pattern, count) {
	console.log('client psubscribed to', pattern, ',', count, 'total subscriptions');
	client2.publish('channeltwo', 'me');
	client3.publish('channelthree', 'me too');
	client4.publish('channelfour', 'and me too!');
});

client1.on('punsubscribe', function (pattern, count) {
	console.log('client1 punsubscribed from', pattern, ',', count, 'total subscriptions');
	client4.end();
	client3.end();
	client2.end();
	client1.end();
});

client1.on('pmessage', function (pattern, channel, message) {
	console.log('(', pattern, ')', 'client1 received message on', channel, ':', message);
	msg_count += 1;

	if (msg_count === 3) {
		client1.punsubscribe();
	}
});

client1.psubscribe('channel*');