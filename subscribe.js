var awsIot = require('aws-iot-device-sdk');
var async = require('async');
var os = require("os");
var config = require('./config.json');

var hostname = os.hostname();

var subscribe = function(callback) {

  var device = awsIot.device({
    // These items are read in via a configuration file, see readme for usage.
    host: config.host,
    protocol: config.protocol
  });

  device
    .on('connect', function() {
      console.log('connect');
      device.subscribe('test');
    });
   device
      .on('close', function() {
         console.log('close');
      });
   device
      .on('reconnect', function() {
         console.log('reconnect');
      });
   device
      .on('offline', function() {
         console.log('offline');
      });
   device
      .on('error', function(error) {
         console.log('error', error);
      });
   device
   .on('message', function(topic, payload) {
     console.log('message', topic, payload.toString());
   });

   callback(null,"Connecting and Subscribing");
}


if (require.main === module) {
  // Number of connections to run on server.
  var connections = 10;
  // Number of seconds to ramp up over.
  var ramp = 6;
  // Concurrent connections attempted per second.
  var rate = Math.ceil((connections / ramp) * 100)/100;;

  var count = 0

  intervalPerConnection = (1/rate)*1000;

  console.log(intervalPerConnection);

  var subscribers = [];

  setTimeout(function request() {
    subscribers.length = 0
    subscribers.push(subscribe);
    async.parallel(subscribers, function(err, result){
      console.log(result)
    });

    if(count == connections){
      console.log("Reached connection count: ", connections);
    }
    else {
      interval = setTimeout(request,intervalPerConnection);
      console.log(count);
      count++;
    }
  }, intervalPerConnection);

} else {
  console.log('please start via node subscribe.js');
}
