var express = require('express'),
    glob = require('glob'),
    fs = require('fs'),
    app = express();

app.use(express.urlencoded());

var scripts = [];

glob('../../src/**/*.js', {sync: true}, function (er, files) {
  scripts = files.map(function (f) {
    return ['<script src="/', s, '"></script>'].join('');
  });
});

app.get('/fixture', function (req, res) {
  res.send([
  '<html><head><title>Testing…</title>',
  scripts.join("\n"),
  '</head><body>',
  '</body></html>'
  ].join("\n"));
});

app.all('/echo', function (req, res) {
  res.send(JSON.stringify({
    method: req.body._method || req.route.method,
    path: req.path
  }));
});

module.exports = app;
