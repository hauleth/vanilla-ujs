var express = require('express'),
    app = express();

app.use(express.urlencoded());

var scripts = [
  'method',
].map(function (s) { return ['<script src="/', s, '.js"></script>'].join(''); });

app.all('/fixture', function (req, res) {
  res.send([
  '<html><head><title>Testing…</title>',
  scripts.join("\n"),
  '</head><body>',
  req.route.method,
  req.body._method,
  '</body></html>'
  ].join("\n"));
});

module.exports = app;
