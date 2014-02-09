var redis = require('redis');
var client = redis.createClient(null, null, {
	command_queue_high_water: 5,
	command_queue_low_water: 1
}),
remaining_ops = 100000, paused = false;

function op() {
	if (remaining_ops <= 0) {
		console.error('finished');
		process.exit(0);
	}

	remaining_ops--;

	if (client.hset('test hash', 'val' + remaining_ops, remaining_ops) === false) {
		console.log('pausing at ' + remaining_ops);
		paused = true;
	} else {
		process.nextTick(op);
	}
}

client.on('drain', function () {
	if (paused) {
		console.log('resuming at', remaining_ops);
		paused = false;
		process.nextTick(op);
	} else {
		console.log('got drain while not paused at', remaining_ops);
	}
});

op();