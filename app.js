
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , session = require('./routes/session')
  , http = require('http')
  , path = require('path')
  , i18n = require('./config/i18n');


var app = express();

var MemStore = require('connect/lib/middleware/session/memory');

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({store: MemStore({
        reapInterval:  6000 * 10
    })}));

    app.use(function (req, res, next) {
        res.locals.__i = i18n[req.session.lang || 'ua'];
        res.locals.session = req.session;
        res.locals.title = 'UWC Market';
        res.locals.message = '';
        next();
    });


    app.use(app.router);
});

app.configure('development', function () {
  app.use(express.errorHandler());
});


function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/session/login_user?redir=' + req.url);
    }
}


app.get('/', requireLogin, routes.index);


/* Sessions */

app.get('/session/login_user', session.loginUser);

app.post('/session/do_login_user', session.doLoginUser);

app.get('/session/logout_user', session.logoutUser);

app.get('/session/registration', session.registration);

app.post('/session/do_registration', session.doRegistration);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
