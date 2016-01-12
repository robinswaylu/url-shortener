var Url = require('../models/url.js');
var request = require('request');
var randomstring = require("randomstring");

function UrlHandler () {

	this.shortenUrl = function(req, res) {
		
		var fullUrl = req.url.slice(5);
		
		//process.env.APP_URL return the url of your application
		// randomstring is npm model which generate random string
		var shortUrl = process.env.APP_URL + randomstring.generate(7);
	 
	  	//check if http:// is present. if not present, append it.
	 	if(!/^(https?\:\/\/)/.test(fullUrl)){
	 		fullUrl = "http://" + fullUrl;
	 	}
	 	
	 	//use resuest module to check if url is valid. If its valid, findOneAndUpdate to mongo database. Else return error
		request(fullUrl, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		     Url
			.findOneAndUpdate({'originalUrl': fullUrl}, {'originalUrl': fullUrl, 'shortUrl': shortUrl}, { upsert: true, new: true}, function(err, data){
			    if(err){
			        console.log("Something wrong when updating data!");
			    } 
			    res.json({'originalUrl': fullUrl, 'shortUrl': shortUrl});
			});	
		  }else{
		  	return res.json({'error':'looks like you have entered an invalid url'});
		  }
		})
	};
	
	this.redirectUrl = function(req, res){
		
		var randomUrlString = req.params.url
		var shortUrl = process.env.APP_URL + randomUrlString;  
		
		Url 
			.findOne({ "shortUrl" : shortUrl }, function(err, data){
				if (err || data === null){
					res.json({error: "No short url found for given input"});
				}else{
					res.redirect(data.originalUrl); 
				}	
			});
	}

 	this.postUrl = function(req, res){
 		var fullUrl = req.body.url;
 		var shortUrl = process.env.APP_URL + randomstring.generate(7);
	 	if(!/^(https?\:\/\/)/.test(fullUrl)){
	 		fullUrl = "http://" + fullUrl;
	 	}
		request(fullUrl, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		     Url
			.findOneAndUpdate({'originalUrl': fullUrl}, {'originalUrl': fullUrl, 'shortUrl': shortUrl}, { upsert: true, new: true}, function(err, data){
			    if(err){
			        console.log("Something wrong when updating data!");
			    } 
			    res.json({'originalUrl': fullUrl, 'shortUrl': shortUrl});
			});	
		  }else{
		  	return res.json({'error':'looks like you have entered an invalid url'});
		  }
		})
	}
}

module.exports = UrlHandler;
