/*
 * GET users listing.
 */

var mysql = require('../libs/mysql'),
    user = require('../models/model_user'),
    dbConstants = require('../config/dbConstants');

var _loginUser = function (req, res, data) {
    user.getLanguageName(data.login, function (result) {

        if (!result.success) {
            req.session.lang = dbConstants.UA_ID;
        } else {
            req.session.lang = result.data;
        }

        req.session.user = data.login;
        req.session.role = data.role;
        res.redirect(req.body.redir || '/');
    });
};

exports.registration = function (req, res) {
    res.render('session_registration');
};

exports.doRegistration = function (req, res) {
    var login = req.body.login,
        password = req.body.password;

    user.createUser(login, password, function (result) {
        if (!result.success) {
            res.render('session_registration', {
                message: result.message
            });
            return;
        }
        _loginUser(req, res, {login: login});
    });
};

exports.doLoginUser = function (req, res) {
    var login = req.body.login,
        password = req.body.password;

    user.getUserByLoginAndPassword(login, password, function (result) {
        if (!result.success) {
            res.render('session_login', {
                message: result.message,
                redir: req.body.redir || '/'
            });
            return;
        }
        _loginUser(req, res, result.data[0])
    });
};

exports.loginUser = function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('session_login', {
        redir: req.query.redir
    });
};
