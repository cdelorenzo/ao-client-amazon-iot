var awsIot = require('aws-iot-device-sdk');
var async = require('async');
var os = require("os");
var config = require('./config.json');

var hostname = process.argv[2].split(".", 2);

workerID=hostname[0];
region=hostname[1];

var subscribe = function(subID) {

  return function (callback) {

  var subscriber = workerID + '_' + subID;
  var device = awsIot.device({
    // These items are read in via a configuration file, see readme for usage.
    host: config.host,
    protocol: config.protocol,
    caPath: config.caPath,
    clientId: subscriber + (Math.floor((Math.random() * 100000) + 1))
  });

  device
    .on('connect', function() {
      device.subscribe('test');
      device.publish('test', JSON.stringify({
        mode1Process: "Published worked for " + subscriber
      }));
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
  //    console.log(message.message.Date + ' ' + subscriber +
  // ' ' + message.message['E-Tag'] + ' ' + message.message.Status +
  // ' ' + diff);
   });

    callback(null, subscriber + ' subscribed');
}
}


if (require.main === module) {
  // Number of connections to run on server.
  var connections = config.connections;
  // Number of seconds to ramp up over.
  var ramp = config.ramp;
  // Concurrent connections attempted per second.
  var rate = Math.ceil((connections / ramp) * 100)/100;;

  var count = 1;

  intervalPerConnection = (1/rate)*1000;

  console.log((new Date()).toISOString() + ' ' + region + ' ' + "Ramping up " + connections +
    " connection/s Rate " + rate +
    " per second over a period of " + ramp + " second/s");

  var subscribers = [];

  setTimeout(function request() {
    subscribers.length = 0
    subscribers.push(subscribe(count));
    async.parallel(subscribers, function(err, result){
      //console.log((new Date()).toISOString() + ' ' + region + ' ' + result )
    });

    if(count == connections){
    }
    else {
      interval = setTimeout(request,intervalPerConnection);
      count++;
    }
  }, intervalPerConnection);

} else {
  console.log('please start via node subscribe.js');
}
