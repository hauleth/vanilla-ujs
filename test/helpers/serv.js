var express = require('express'),
    glob = require('glob'),
    fs = require('fs'),
    app = express();

app.use(express.urlencoded());

var scripts = [
  'global',
  'confirm',
  'method',
].map(function (s) { return ['<script src="/', s, '.js"></script>'].join(''); });

var template = function(body) {
  return [
    '<html><head><title>Testing…</title></head><body>',
    body,
    '</body></html>'
  ].join("\n");
};

app.get('/fixture', function (req, res) {
  res.send(template(scripts.join('')));
});

app.all('/echo', function (req, res) {
  res.send(template(JSON.stringify({
    method: req.body._method || req.route.method,
    path: req.path
  })));
});

module.exports = app;
