var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants');


module.exports = (function () {
    var sql = {
        getLanguageName: 'SELECT language.name as name FROM user INNER JOIN language ON (user.language_id = language.id) WHERE user.login=$1',
        getUserByLogin: 'SELECT * FROM user WHERE login=$1',
        getUserByLoginAndPassword: 'SELECT * FROM user WHERE (login=$1 AND password=$2)',
        createUser: 'INSERT INTO user (login, password, language_id) VALUES ($1, $2, $3)'
    };

    var _getUserByLogin = function (login, callback) {
        mysql.query(sql.getUserByLogin, [login], function (res, fields) {
            if (!res.length) {
                callback({
                    success: false,
                    message: 'user not found'
                });
                return;
            }
            callback({
                success: true,
                data: res
            });
        });
    };

    var _isLoginExist = function (login, callback) {
        _getUserByLogin(login, function (res) {
            console.log(res);
            if (res.success) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };

    return {
        getLanguageName: function (login, callback) {
            this.getUserByLogin(login, function (res, fields) {
                mysql.query(sql.getLanguageName, [login], function (res, fields) {
                    if (res.length) {
                        callback({
                            success: true,
                            data: res[0].name
                        });
                    } else {
                        callback({
                            success: false,
                            message: 'user not found'
                        });
                    }
                });
            });
        },

        getUserByLogin : function (login, callback) {
            _getUserByLogin(login, callback);
        },

        getUserByLoginAndPassword : function (login, password, callback) {
            var shasum = crypto.createHash('sha1'),
                shaPassword = shasum.update(password).digest('hex');
            mysql.query(sql.getUserByLoginAndPassword, [login, shaPassword], function (res, fields) {
                if (!res.length) {
                    callback({
                        success: false,
                        message: 'wrong login or password'
                    });
                    return;
                }
                callback({
                    success: true,
                    data: res
                });
            });
        },

        createUser : function (login, password, callback) {
            var shasum = crypto.createHash('sha1'),
                shaPassword = shasum.update(password).digest('hex');
            _isLoginExist(login, function (exist) {
                if (exist) {
                    callback({
                        success: false,
                        message: 'user with this name is already created'
                    });
                    return;
                }

                mysql.query(sql.createUser, [login, shaPassword, dbConstants.UA_ID], function (res, fields) {
                    callback({
                        success: true,
                        data: res
                    });
                });
            });
        }
    };
})();
