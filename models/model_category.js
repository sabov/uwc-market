var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants'),
    extend = require('xtend');


module.exports = (function () {
    var sql = {
        createCategory: 'INSERT INTO category() VALUES()',
        createCategoryI18n: 'INSERT INTO category_i18n(category_id, language_id, name) VALUES(:id, :language_id, :name)',
        deleteCategory: 'DELETE FROM category WHERE id = :id',
        updateCategoryI18n: 'UPDATE category_i18n SET name = :name, language_id = :language_id, img_path = :img_path WHERE category_id = :id',
        getCategoryI18nById: 'SELECT * FROM category_i18n WHERE id = :id',
        getAllCategories: 'SELECT category_i18n.* FROM category INNER JOIN category_i18n ON (category.id = category_i18n.category_id)',
        getAllCategoryI18n: 'SELECT category_i18n.* FROM category INNER JOIN category_i18n ON (category.id = category_i18n.category_id) WHERE category_i18n.language_id = :language_id'
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
        //params = {category_id:''}
        deleteCategory: function (params, callback) {
            mysql.query(sql.deleteCategory, params, function (res, fields) {
                callback(res);
            });
        },
        //params = {category_id:''}
        getAllCategories: function (callback) {
            mysql.query(sql.getAllCategories, function (res) {
                callback(res);
            });
        },
        getAllCategoryI18n: function (params, callback) {
            mysql.query(sql.getAllCategoryI18n, params, function (res) {
                callback(res);
            });
        }
    };
})();

