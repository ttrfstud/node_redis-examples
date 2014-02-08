var cl = require('redis').createClient();
	cl.on('ready', function () {

	console.log(cl.server_info.redis_version);
	console.log(cl.server_info.versions);

	console.log(JSON.stringify(cl.server_info));
});