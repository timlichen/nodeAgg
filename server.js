// var mongoose = require('mongoose');
// require('./server/config/mongoose.js');
// var blob = mongoose.model('Aggregator');
var http = require('http');
var requestNPM = require('request');
var fs = require('fs');

var jsonData;

var server = http.createServer(function(request, response) {

    if(request.url === '/index'){
      fs.readFile('index.html', 'utf8', function(errors, contents){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(contents);  //  send response body
        response.end(); // finished!
      })

    // } else {

    function setData(){

    var googleJSON = {
      url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.google.com/trends/hottrends/atom/feed?pn=p1'
    };

    var redditJSON = {
      url: 'https://www.reddit.com/r/all/.json?limit=5'
    }

    var Rcontent;
    var Gcontent;

    function writeData(){
     function callback(error, response, body){
      if(!error && response.statusCode == 200){
        var stats = body;
        }
      }
      var responseWrite = requestNPM(redditJSON, callback).pipe(fs.createWriteStream('redditRes.html'));
      var responseWrite = requestNPM(googleJSON, callback).pipe(fs.createWriteStream('googleRes.html'));
      }

    writeData();

    function readRedditData(){
      fs.readFile('redditRes.html', 'UTF-8', function(error, data){
        if(error){
          console.log(error);
        }
        Rcontent = data;
      });
    }

    function readGoogleData(){
      fs.readFile('googleRes.html', 'UTF-8', function(error, data){
        if(error){
          console.log(error);
        }
          Gcontent = data;
        });
      }

  var interval = setInterval(function(){
    console.log("Attempting to read.");
    // console.log(Gcontent);
    readRedditData();
    readGoogleData();

    if((Rcontent != undefined) && (Rcontent != "") && (Gcontent != undefined) && (Gcontent != "")){
        var gContJson = JSON.parse(Gcontent);
        var rContJson = JSON.parse(Rcontent);
        jsonData = {'topGoogleSearches' : gContJson.responseData.feed.entries, 'topFiveReddit': rContJson.data.children};

        // response.write(JSON.stringify(jsonData));

        io.sockets.on('connection', function(socket){
          console.log('Socket ON');
          console.log(socket.id);
        });

        var emitData = function(){
          console.log('emitting');
          io.emit('SEND_data', jsonData);
        };

        emitData();
        clearInterval(interval);
      }
    }, 5000);
};



var MasterTimer = setInterval(function(){
  console.log('Master Timer');
  setData();
  // clearInterval(MasterTimer);
}, 20000)



  }

}).listen(process.env.PORT || 8000);

var io = require('socket.io').listen(server);

var emitLoad = function(){
  console.log('Loading');
  io.emit('LOAD_data', {'LOADING' : 'DATA IS LOADING'});
};

emitLoad();


