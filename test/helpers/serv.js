var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var scripts = [
  'polyfills',
  'confirm',
  'method',
  'disable',
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

app.all('/assets/mocha.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, "../../node_modules/mocha/mocha.js"));
});

app.all('/assets/mocha.css', function (req, res) {
  res.sendFile(path.resolve(__dirname, "../../node_modules/mocha/mocha.css"));
});

app.all('/assets/sinon.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, "../../node_modules/sinon/pkg/sinon.js"));
});

app.all('/assets/chai.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, "../../node_modules/chai/chai.js"));
});

module.exports = app;
