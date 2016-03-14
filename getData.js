var http = require('http');
var querystring = require('querystring');
var sha1 = require("sha1");
var fs = require('fs');

var crypto = require('crypto');
var shasum = crypto.createHash('sha1');

var request = require("request");

var allLocations = [];

//Creates the necessery information to send with request

function createURL(offset) {
	auth = {};
	auth.callerId = "HyperIsland-grp4";
	auth.time = new Date().getTime();
	auth.unique = crypto.randomBytes(Math.ceil(16/2)).toString("hex").slice(0, 16);
	auth.key = "KjAq1ipvDIkGYsDkeNmBftFyDQjVDOoFx7rzT93v";
	auth.hash = sha1(auth.callerId + auth.time + auth.key + auth.unique);
	auth.limit = 500;
	auth.offset = offset;
	var url = "http://api.booli.se/sold?areaId=35,1,76,18,130&minSoldDate=20150101&maxRooms=2&";
	return url + querystring.stringify(auth);
};

//Limit
//offset

//Function to be called recursively (within itself)
function getData(offset) {

	var url = createURL(offset);

	var options = {
		url: url,
		headers: {"Accept": "application/vnd.booli-v2+json"}
	}

	request(options, function(err, response, body){
		var body = JSON.parse(body);

		console.log(body.offset);

		//Add all objects to allLocations array
		body.sold.map( function(obj) {
			var obj = {
				soldPrice : obj.soldPrice,
				location: {
					position: {
						longitude: obj.location.position.longitude,
						latitude: obj.location.position.latitude
					}
				}
			}

			allLocations.push(obj);
		});

		//If we've downloaded everything, write to file.
		if( (body.offset + body.count) == body.totalCount ) {
				var stringToWrite = "var jsonData = " + JSON.stringify(allLocations) + ";";

			    fs.writeFile('example.js', stringToWrite, function (err){
  					if (err) return console.log(err);
  						console.log('data > data.js');
  					});
		} else {
		//Else, make another request

			getData(body.offset + body.count);
		}

	})

}

getData(0);
