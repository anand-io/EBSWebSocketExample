var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express.createServer();

app.use(express.static(__dirname + '/public'));
var port = normalizePort(process.env.PORT || '3000');
app.listen(port);

var wss = new WebSocketServer({server: app});
wss.on('connection', function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
  }, 100);
  console.log('started client interval');
  ws.on('close', function() {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
