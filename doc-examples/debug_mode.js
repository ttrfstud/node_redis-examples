var cl = require('redis').createClient();

require('redis').debug_mode = true;

cl.on('connect', function () {
	cl.set('fooo_rand', 'val');
	cl.quit();
})