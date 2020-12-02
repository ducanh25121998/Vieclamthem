// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 1000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
const path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
app.set('view engine', 'ejs'); // set up ejs for templating
var configDB = require('./config/database.js');
require('./config/passport')(passport);
app.use(session({
    secret: 'ducanh', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

MONGODB_URI = "mongodb://uerzoxjaeqimpt3gla45:15lcTiqP601vw23s5nju@bwokqq4v4zpaipu-mongodb.services.clever-cloud.com:27017/bwokqq4v4zpaipu"
// configuration ===============================================================
mongoose.connect(MONGODB_URI,{
    useNewUrlParser :true,
    useUnifiedTopology :true
})

 // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')))
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes-admin.js')(app, passport);
// launch ======================================================================
app.listen(port);
console.log(' Đang hoạt động tại port : ' + port);
