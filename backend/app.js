const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const movieRouter = require('./routes/movie');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    return next();
});;

app.use(morganLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { res.set('Cache-Control', 'no-store'); return next();});

/** ON / SERVE FORNTEND FILES ON PRODUCTION MODE*/
app.use('/', indexRouter);
app.use((req, res, next) => {
    return next();
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/movie', movieRouter);

module.exports = app;