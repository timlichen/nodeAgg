var http = require('http');
var requestNPM = require('request');
var fs = require('fs');

http.createServer(function(request, response) {

    if(request.url === '/index'){
      fs.readFile('index.html', 'utf8', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(contents);  //  send response body
        response.end(); // finished!
      })
    } else {

    var options = {

      //REPLACE nameOnPlatform with Uplay Name.
      url: 'https://api-ubiservices.ubi.com/v2/profiles?nameOnPlatform=M3t4lst0rm&platformType=uplay',

      // https://uplaywebcenter.ubi.com/v1/stats/playerStats/?game=TCTD&locale=en-GB&platform=PC&userId=d2880d3a-3f57-4a45-8a29-37682e0f0cd5

      headers: {
        'Ubi-AppId': '314d4fef-e568-454a-ae06-43e3bece12a6',

        // REPLACE #'s with your 'Authorization' token from the headers (e.g: Ubi_v1 t=ey...)'
        'Authorization': '#######'
      }
    }

    function callback(error, response, body){
      if(!error && response.statusCode == 200){
        var stats = body;
        console.log(stats);
      }
    }
    var requestBody = requestNPM(options, callback);
    var responseWrite = requestNPM(options, callback).pipe(fs.createWriteStream('index.html'));
    response.write(JSON.stringify(requestBody));

    response.end();
  }
}).listen(8000);