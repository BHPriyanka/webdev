/*jslint node: true */
"use strict";

var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer'); // v1.0.5
var upload        = multer(); // for parsing multipart/form-data
//var uuid          = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

// connect to local mongo database
var connectionString = 'mongodb://127.0.0.1:27017/cs5610assignmentforms';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(multer());
app.use(express.session({secret: 'NETWORK123SECURITY'}));

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000 ;

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);