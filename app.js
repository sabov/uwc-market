
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , session = require('./routes/session')
  , http = require('http')
  , path = require('path');


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
    app.use(app.router);
});

app.locals({
    title: 'UWC Market',
    version: 3
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


function requireLogin(req, res, next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/session/create?redir=' + req.url);
    }
}


app.get('/', routes.index);


/* Sessions */

app.get('/session/create', function(req, res) {
    res.render('session_create', {
        redir: req.query.redir
    });
});


app.post('session/new', function(req, res) {
    
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
