'use strict';
var path = process.cwd();
var UrlHandler = require(path + '/app/controllers/urlHandler.server.js');

module.exports = function (app) {
	var urlHandler = new UrlHandler();
	app.get('/', function (req, res) {
  		res.sendFile(path + '/public/index.html');
	});
	app.get('/new/:url*', urlHandler.shortenUrl);
	app.get('/:url', urlHandler.redirectUrl);
	app.post('/', urlHandler.postUrl);
	
};
