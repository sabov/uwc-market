module.exports = (function () {
    var mysql = require('mysql'),
        conf = require('../config/db'),
        client = mysql.createClient();

    client.host = conf.get('host');
    client.port = conf.get('port');
    client.user = conf.get('user');
    client.password = conf.get('password');
    client.database = conf.get('database');

    var _prepareSql = function (sql, params) {
        var re = /\$(\d+)/gi;
        sql = sql.replace(re, function (a, b) {
            return client.escape(params[b - 1]);
        });
        return sql;
    };

    return {
        query: function (sql, params, callback) {
            sql = _prepareSql(sql, params);
            client.query(sql, function (err, res, fields) {
                if (err) {
                    throw err;
                }
                callback(res, fields);
            });
        }
    };
})();