var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
