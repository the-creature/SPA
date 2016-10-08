var express = require('express');
var path = require('path');
var app = express();

const publicPath = path.resolve('public');

app.get('/', function(req, res) {
  return res.sendfile('index.html', { root: publicPath });
});

app.use(express.static(publicPath));

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
