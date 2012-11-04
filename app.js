var express = require('express')
  , session = require('./routes/session')
  , product = require('./routes/product')
  , category = require('./routes/category')
  , maker = require('./routes/maker')
  , http = require('http')
  , path = require('path')
  , dbConstants = require('./config/dbConstants')
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
        res.locals.__i = i18n[req.cookies.language_id || dbConstants.UA_ID];
        res.locals.session = req.session;
        res.locals.title = 'UWC Market';
        res.locals.message = '';
        res.role = req.session.role || '';
        req.body.language_id = req.body.language_id || req.cookies.language_id || dbConstants.UA_ID;
        next();
    });

    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

function secure(req, res, next) {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.redirect('/');
    }
}

/* Sessions */
app.post('/login', session.login);
app.post('/registration', session.registration);
app.get('/logout', session.logout);
app.get('/switch_language/:language_id', session.switchLanguage);

/* Category */
app.get('/category', secure, category.list);
app.post('/category', secure, category.create);
app.get('/category/delete/:category_id', secure, category.delete);
app.get('/category/update/:category_id', secure, category.edit);
app.post('/category/update/:category_id', secure, category.update);

/* Maker */
app.get('/maker', secure, maker.list);
app.post('/maker', secure, maker.create);
app.get('/maker/delete/:maker_id', secure, maker.delete);
app.get('/maker/update/:maker_id', secure, maker.edit);
app.post('/maker/update/:maker_id', secure, maker.update);

/* Product */
app.get('/', product.default);
app.post('/', secure, product.create);
app.get('/:product_id', product.show);
app.post('/:product_id', secure, product.update);
app.get('/category/:category_id', product.category);
app.get('/category/:category_id/maker/:maker_id', product.categoryAndMaker);
app.get('/product/delete/:product_id', secure, product.delete);
app.get('/product/edit/:product_id', product.edit);
app.get('/product/delete_image/:image_id', product.deleteImage);

app.get('*', function (req, res) {
    res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
