var express = require('express'),
    fs = require('fs'),
    app = express();

app.use(express.urlencoded());

var scripts = [
  'pollyfils',
  'confirm',
  'method',
  'liteajax',
  'csrf'
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
  res.send(template([
    '<script>window.top.',
    req.query.callback,
    '(',
    JSON.stringify({
    method: req.body._method || req.route.method,
    csrf: req.get('X-CSRF-Token'),
    path: req.path
    }),
    ');</script>'
  ].join('')));
});

app.all('/xhr', function (req, res) {
  res.send({
    method: req.body._method || req.route.method,
    csrf: req.get('X-CSRF-Token') || req.body[req.query.param],
    path: req.path
  });
});

module.exports = app;
