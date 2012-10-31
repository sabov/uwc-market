module.exports = (function () {
    var params = {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'market'
    };
    return {
        get: function (name, defaultValue) {
            return params[name] || defaultValue;
        }
    }
})();