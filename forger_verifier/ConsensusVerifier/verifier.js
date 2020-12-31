'use strict';

var http = require('./node_modules/xmlhttprequest/lib/XMLHttpRequest');
var monitorServers = require('fs');

var servers = [];
var betterConsensusServer = null;
var timeInterval = null;
var timeToWait = null;

console.log('initiating');
initialization();

function initialization(){
    initiate().then(function(response){
        var config = JSON.parse(response);    
        if (config.hosts.length === 0){
            throw new Error("0 servers");
        }

        servers = config.hosts;
        betterConsensusServer = servers[0];
        timeInterval = config.time;
        timeToWait = config.maxwaittime;        
        
        verifyConsensus();
    });
}

async function initiate(){
    let response = monitorServers.readFileSync("./monitor.json");
    monitorServers.closeSync(0);

    return response;
}

function verifyConsensus(){

    try{
      console.log("Get consensus servers: ");
      servers.forEach(server => {
  
          var consensusRequest = new http.XMLHttpRequest();
  
          consensusRequest.onload = function(){
              var host = JSON.parse(consensusRequest.getRequestHeader("server-host"));
              
              if (consensusRequest.status === 200){
                  var data = JSON.parse(consensusRequest.responseText).data;
  
                  servers.forEach(serveraux =>{
                      if (serveraux.host === host){
                          serveraux.consensus = data.consensus;
                          console.log("host: ".concat(serveraux.host).concat(" consensus: ").concat(serveraux.consensus));
                          serveraux.online = true;
  
                          if (data.consensus > betterConsensusServer.consensus){
                              betterConsensusServer = serveraux;
                          }
                      }
                  });
              }
          }
  
          consensusRequest.open(
              "GET",
              "http://".concat(server.host).concat(":").concat(server.port).concat("/api/node/status"),
              true
          );
  
          consensusRequest.setRequestHeader("server-host", JSON.stringify(server.host));
          consensusRequest.send();
      });
        
      var objTimeout = setTimeout(() => {        
        updateServerProperties();
        }, timeToWait);

      objTimeout.ref();

    }catch(e){
      verifyConsensus();
    }    
}

function updateServerProperties(){
    console.log("Forging: ");
    servers.forEach(serveraux =>{
        if (serveraux.online === true){
            if (betterConsensusServer.host === serveraux.host){
                serveraux.forging = true;
            }
            setForging(serveraux);
        }else{
            console.log("Server ".concat(serveraux.host).concat(" not accessible"));
        }
    });

    var interval = setInterval(function (){
        clearInterval(interval);

        servers.forEach(serveraux =>{
            serveraux.online = false;
            serveraux.consensus = 0;
            serveraux.forging = false;
        });

        betterConsensusServer = servers[0];        
        verifyConsensus();
    
    }, timeInterval);
}

function setForging(server){
                          
    console.log("   set forging: ".concat(server.host).concat(" Forging status:").concat(server.forging) );

    var forgingRequest = new http.XMLHttpRequest();
    var url = "http://".concat(server.host).concat(":").concat(server.gatewayport).concat("/api/forging");

    forgingRequest.onload = function(){
        console.log("Host: ".concat(JSON.parse(forgingRequest.getRequestHeader("server-host"))).concat(" ").concat(forgingRequest.responseText));
        if (forgingRequest.status === 200){
            console.log("completed");
        }
    }

    forgingRequest.handleError = function(e){
        console.log("Host: ".concat(JSON.parse(forgingRequest.getRequestHeader("server-host"))).concat(" didn't answer or was in error"));
        return;        
    }

    forgingRequest.open("POST", url);
    forgingRequest.setRequestHeader("Cache-Control", "no-cache");
    forgingRequest.setRequestHeader("Content-Type", "application/json");
    forgingRequest.setRequestHeader("server-host", JSON.stringify(server.host));
    forgingRequest.send(JSON.stringify(server));
}

