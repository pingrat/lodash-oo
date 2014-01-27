
var fileExists    = require('fs').fileExistsSync;

if (fileExists(__dirname + '/dist/lodash-oo.js')) {
	console.log('we cool dawg');
}
