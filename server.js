var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var server = app.listen(8000, function() {
    console.log("Express Server running on port 8000!!");
});

var data = [
    { id:1, name:'홍길동', tel:'010-2121-3232' },
    { id:2, name:'이몽룡', tel:'010-2121-4341' }
];
var last_id = 2;

var router = require('./router/main')(app, data, last_id);


