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
      url: 'https://uplaywebcenter.ubi.com/v1/stats/playerStats/?game=TCTD&locale=en-GB&platform=PC&userId=d2880d3a-3f57-4a45-8a29-37682e0f0cd5',
      headers: {
        'Ubi-AppId': '#######',
        'Authorization': '######'
      }
    }

    function callback(error, response, body){
      if(!error && response.statusCode == 200){
        var stats = body;
        console.log(stats);
      }
    }

    var requestBody = requestNPM(options, callback);
    response.write(JSON.stringify(requestBody));
    response.end();

    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  // });
  }
}).listen(8000);