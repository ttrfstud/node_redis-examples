var redis = require('redis');
var client1 = redis.createClient(), msg_count = 0,
client2 = redis.createClient();

redis.debug_mode = false;

client1.on('subscribe', function (channel, count) {
	console.log('client1 subscribed to', channel, ',', count, 'total subscriptions');

	if (count === 2) {
		client2.publish('a nice channel', 'i am sending a message');
		client2.publish('another one', 'i am sending second');
		client2.publish('a nice channel', 'i am sendin last');
	}
});


client1.on('unsubscribe', function (channel, count) {
	console.log('client1 unsubscribed from', channel, ',', count, 'total subscriptions');
	if (count === 0) {
		client2.end();
		client1.end();
	}
});

client1.on('message', function (channel, message) {
	console.log('client1 channel', channel, ':', message);
	msg_count += 1;

	if (msg_count === 3) {
		client1.unsubscribe();
	}
});

client1.on('ready', function () {
	client1.incr('did a thing');
	client1.subscribe('a nice channel', 'another one');
});