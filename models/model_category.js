var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants'),
    extend = require('xtend');


module.exports = (function () {
    var sql = {
        createCategory: 'INSERT INTO category() VALUES()',
        createCategoryI18n: 'INSERT INTO category_i18n(category_id, language_id, name) VALUES(:category_id, :language_id, :name)',
        deleteCategory: 'DELETE FROM category WHERE id = :category_id',
        updateCategoryI18n: 'UPDATE category_i18n SET name = :name, language_id = :language_id, img_path = :img_path WHERE category_id = :category_id',
        getCategoryI18nById: 'SELECT * FROM category_i18n WHERE id = :category_id'
    };

    var _createCategoryI18n = function (params, callback) {
        mysql.query(sql.createCategoryI18n, params, function (res) {
            if (res.length) {
                callback(res);
            }
        });
    };
    return {
        //params = {name:'',language_id:''}
        createCategory: function (params, callback) {
            mysql.query(sql.createCategory, params, function (res, fields) {
                params.categoryId = res.insertId;
                _createCategoryI18n(params, function (res, fields) {
                    callback(res);
                });
            });
        },
        //params = {category_id:'', language_id:'', name:'', path:'', img_path:''}
        updateCategory: function (params, callback) {
            this.getCategoryById(params, function (category) {
                mysql.query(sql.updateCategoryI18n, extend(category, params), function (result) {
                    callback(result);
                });
            });
        },
        //params = {categoryId:''}
        deleteCategory: function (params, callback) {
            mysql.query(sql.deleteCategory, params, function (res, fields) {
                callback(res);
            });
        },
        getCategoryById: function (params, callback) {
            mysql.query(sql.getCategoryI18nById, params, function (res) {
                callback(res[0]);
            });
        }
    };
})();

