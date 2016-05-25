var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var scripts = [
  'polyfills',
  'confirm',
  'method',
  'liteajax',
  'csrf',
  'form'
].map(function (s) { return ['<script src="/assets/javascripts/vanilla-ujs/', s, '.js"></script>'].join(''); });

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
      method: (req.body._method || req.method).toLowerCase(),
      csrf: req.get('X-CSRF-Token'),
      path: req.path
    }),
    ');</script>'
  ].join('')));
});

app.all('/xhr', function (req, res) {
  res.send({
    method: (req.body._method || req.method).toLowerCase(),
    csrf: req.get('X-CSRF-Token') || req.body[req.params['param']],
    path: req.path
  });
});

module.exports = app;
