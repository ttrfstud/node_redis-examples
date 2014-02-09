var client = require('redis').createClient();

client.keys('*', function (err, keys) {
	keys.forEach(function (key, pos) {
		client.type(key, function (err, keytype) {
			console.log(key, 'is', keytype);
			if (pos === (keys.length - 1)) {
				client.quit();
			}
		});
	});
});