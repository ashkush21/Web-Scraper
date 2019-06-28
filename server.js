var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();
var port = process.env.PORT || 8081;



app.get('/scrape', function(req, res){

	url = 'https://www.mxplayer.in/movies' 

	request(url, function(err, res, html){
		if(!err){


			var $ = cheerio.load(html);


				var title, year, type, imgurl, genre, language;
				var json = {title : "", year : "", type : "", imgurl : "", genre : "", language: ""};
				var arr = [];


			$('.infiniter-content').children('.section').each(function(index, el) {

				$(this).find('.slide').each(function(ind, ele) {
					var data = $(this);
					    imgurl = data.children().find('.image-card').attr('src');
						title = data.children().find('.card-details').children().first().text();
					var str = data.children().find('.card-details').children().last().text();
					var res = str.split(" ");
						genre = res[0];
						language = res[1];
						year = res[2];
						type = "movie";

						json.title = title;
			   			json.year = year;
			   			json.type = type;
			   			json.imgurl = imgurl;
			   			json.genre = genre;
			   			json.language = language;
			   			var obj = JSON.stringify(json);
						arr.push(obj);
				});
			});


		}
		fs.writeFile('output.json', arr, function(err){
			console.log('File successfully written! - Check');
		})
	});
	res.send("Check console");
});


app.listen(port, function(){
	console.log('server started at port' + port);
});

