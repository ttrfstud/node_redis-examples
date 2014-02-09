var client = require('redis').createClient();

function print_results(obj) {
	console.dir(obj);
	client.quit();
}

client.keys('*', function (e, all_keys) {
	var key_types = {};

	all_keys.forEach(function (key, pos) {
		client.type(key, function (err, type) {
			key_types[key] = type;

			if (pos === all_keys.length - 1) {
				print_results(key_types);
			}
		});
	});
});