var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants');


module.exports = (function () {
    var sql = {
        getUserLanguage: 'SELECT * FROM user INNER JOIN language ON (user.language_id = language.id) WHERE user.username=:username',
        getUserByLogin: 'SELECT * FROM user WHERE username=:username',
        getUserByLoginAndPassword: 'SELECT * FROM user WHERE (username=:username AND password=:password)',
        createUser: 'INSERT INTO user (username, password, language_id) VALUES (:username, :password, :language_id)'
    };

    var _getUserByLogin = function (params, callback) {
        mysql.query(sql.getUserByLogin, params, function (res) {
            if (!res.length) {
                callback({
                    success: false,
                    message: 'User not found'
                });
            } else {
                callback({
                    success: true,
                    data: res
                });
            }
        });
    };

    var _checkUsername = function (params, callback) {
        _getUserByLogin(params, function (res) {
            if (res.success) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };

    return {
        getUserLanguage: function (params, callback) {
            mysql.query(sql.getUserLanguage, params, function (res) {
                if (res.length) {
                    callback({
                        success: true,
                        data: res[0]
                    });
                }
            });
        },

        getUserByLoginAndPassword : function (params, callback) {
            var shasum = crypto.createHash('sha1');
            params.password = shasum.update(params.password).digest('hex');
            mysql.query(sql.getUserByLoginAndPassword, params, function (res) {
                if (!res.length) {
                    callback({
                        success: false,
                        message: 'Wrong username or password'
                    });
                } else {
                    callback({
                        success: true,
                        data: res[0]
                    });
                }
            });
        },

        createUser : function (params, callback) {
            var shasum = crypto.createHash('sha1');
            params.password = shasum.update(params.password).digest('hex');
            _checkUsername(params, function (exist) {
                if (exist) {
                    callback({
                        success: false,
                        message: 'User with this name is already exist'
                    });
                } else {
                    mysql.query(sql.createUser, params, function (res) {
                        if (res) {
                            callback({
                                success: true,
                                data: res
                            });
                        } else {
                            callback({
                                success: false,
                                message: 'Can not create user'
                            });
                        }
                    });
                }
            });
        }
    };
})();
