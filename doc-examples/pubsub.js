var redis = require('redis');
var publisher = redis.createClient();
var subscriber = redis.createClient();
var msg_count = 0;

subscriber.on('unsubscribe', function (channel, count) {
	console.log('subscriber is not anymore listening to channel', channel);
	console.log('active subscribtions for him are', count);

	subscriber.end();
	publisher.end();
})

subscriber.on('subscribe', function (channel, count) {
	publisher.publish('a nice channel', 'i am sending 1');
	publisher.publish('a nice channel', 'i am sending 2');
	publisher.publish('a nice channel', 'i am sending 3');
});

subscriber.on('message', function (channel, message) {
	console.log('news!', channel, message);
	msg_count += 1;

	if (msg_count === 3) {
		subscriber.unsubscribe();
	}
});

subscriber.subscribe('a nice channel');