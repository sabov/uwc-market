var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants'),
    extend = require('xtend');


module.exports = (function () {
    var sql = {
        createMaker: 'INSERT INTO maker(name) VALUES(:name)',
        deleteMaker: 'DELETE FROM maker WHERE id = :maker_id',
        updateMaker: 'UPDATE maker SET name = :name WHERE id = :maker_id',
        getMakersByCategoryId: 'SELECT * FROM maker WHERE category_id = :category_id',
        getAllMakers: 'SELECT * FROM maker',
        getMakerById: 'SELECT * FROM maker where id = :maker_id'
    };
    return {
        //params = {name:''}
        createMaker: function (params, callback) {
            mysql.query(sql.createMaker, params, function (res) {
                callback(res.insertId);
            });
        },
        //params = {id:'' name:''}
        updateMaker: function (params, callback) {
            mysql.query(sql.updateMaker, params, function (result) {
                callback(result);
            });
        },
        //params = {id:''}
        deleteMaker: function (params, callback) {
            mysql.query(sql.deleteMaker, params, function (res, fields) {
                callback(res);
            });
        },
        //params = {category_id:''}
        getMakersByCategoryId: function (params, callback) {
            mysql.query(sql.getMakersByCategoryId, params, function (res) {
                callback(res);
            });
        },
        //params = {category_id:''}
        getAllMakers: function (params, callback) {
            mysql.query(sql.getAllMakers, function (res) {
                callback(res);
            });
        },
        getMakerById: function (params, callback) {
            mysql.query(sql.getMakerById, params, function (res) {
                callback(res[0]);
            });
        }

    };
})();
