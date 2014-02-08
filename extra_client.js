var client = require('redis').createClient();

client.set('keyyy', 'val');
console.log('client_connected just after created', client.connected);
console.log('just after created command_queue', client.command_queue);
console.log('offline_queue just after created', client.offline_queue);

console.log('retry delay', client.retry_delay);
console.log('retry backoff', client.retry_backoff);

client.on('connect', function () {
	console.log('now connected');
	console.log('client_connected just after created', client.connected);
	console.log('just after created command_queue', client.command_queue);
	console.log('offline_queue just after created', client.offline_queue);

	console.log('retry delay', client.retry_delay);
	console.log('retry backoff', client.retry_backoff);

	setTimeout(function () {
		console.log('was waiting for some');

		console.log('client_connected just after created', client.connected);
		console.log('just after created command_queue', client.command_queue);
		console.log('offline_queue just after created', client.offline_queue);

		console.log('retry delay', client.retry_delay);
		console.log('retry backoff', client.retry_backoff);

	}, 1550);

});

client.on('error', function () {

	console.log('now connected');
	console.log('client_connected just after created', client.connected);
	console.log('just after created command_queue', client.command_queue);
	console.log('offline_queue just after created', client.offline_queue);

	console.log('retry delay', client.retry_delay);
	console.log('retry backoff', client.retry_backoff);
});