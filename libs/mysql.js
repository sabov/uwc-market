module.exports = (function () {
    var mysql = require('mysql'),
        client = mysql.createClient();

    client.host='127.0.0.1';
    client.port= '3306';
    client.user='root';
    client.password='';
    client.database='education'

    var _prepareSql = function (sql, params) {
        var re = /\$(\d+)/gi;
        sql = sql.replace(re, function (a,b) {
            return params[b-1];
        });
        return sql;
    }

    return {
        query: function (sql, params, callback) {
            sql = _prepareSql(sql, params);
            client.query(sql, function (err, res, fields) {
                if (err) throw err;
                callback(res, fields);
            });
        }
    }
})();