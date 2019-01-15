const express = require('express');
const routes = require('./api/routes');
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql');
const config = require('./config');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser')
const generate_schema = require('./api/models/schema');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('./api/controllers/auth.controller');

const app = express();

var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

generate_schema(connection, config);

var options = {
    host: config.host,
    port: 3306,
    user: config.user,
    password: config.password,
    database: config.database,
};
var sessionStore = new MySQLStore(options);


//  Middlewares
app.use(session({
    key: 'e_session_cookie',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('session_cookie_secret'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: [
        "http://localhost:4200"
    ],
    credentials: true
}));

// Authentication settings
passport.serializeUser(function (user, done) {
    if (user.id != null)
        done(null, user.id);
    else {
        done(null, -1);
    }
});

passport.deserializeUser(function (userId, done) {
    auth.get_user(userId, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        connection.query(`SELECT id, username, password FROM User where username="${username}" LIMIT 1`, function (err, result, fields) {
            if (err)
                return done(err);
            if (result[0] != undefined) {
                if (result[0].password == password)
                    return done(null, { username: result[0].username, id: result[0].id });
            }
            return done(null, { username: false, id: -1 });
        });
    }
));


// Routes
app.use('/', routes);

app.listen(config.serverport, () => {
    console.log('E-Stationary Mart Backend is listening on port: ' + config.serverport)
});

module.exports = app;