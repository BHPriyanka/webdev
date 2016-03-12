var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());

app.use(express.static(__dirname + '/public'));
var ipaddress = process. env .OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process. env .OPENSHIFT_NODEJS_PORT || 3000 ;
/*app .get( 'https://news.google.com/news?&callback=?' , function (req, res){
    console.log(req);
    res.send(req);
});*/
/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
};*/
require("./public/Experiments/omdbproject/server/app.js")(app);

app . listen ( port , ipaddress );