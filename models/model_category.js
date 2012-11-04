var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants'),
    extend = require('xtend');


module.exports = (function () {
    var sql = {
        createCategory: 'INSERT INTO category() VALUES()',
        createCategoryI18n: 'INSERT INTO category_i18n(category_id, language_id, name) VALUES(:category_id, :language_id, :name)',
        deleteCategory: 'DELETE FROM category WHERE id = :category_id',
        updateCategoryI18n: 'UPDATE category_i18n SET name = :name, language_id = :language_id WHERE category_id = :category_id AND language_id = :language_id',
        getCategoryI18nById: 'SELECT * FROM category_i18n WHERE category_id = :category_id AND category_i18n.language_id = :language_id',
        getCategoryById: 'SELECT * FROM category_i18n WHERE category_id = :category_id',
        getAllCategories: 'SELECT category_i18n.* FROM category INNER JOIN category_i18n ON (category.id = category_i18n.category_id)',
        getAllCategoryI18n: 'SELECT category_i18n.* FROM category INNER JOIN category_i18n ON (category.id = category_i18n.category_id) WHERE category_i18n.language_id = :language_id'
    };


    return {
        createCategory: function (params, callback) {
            mysql.query(sql.createCategory, params, function (res, fields) {
                callback(res.insertId);
            });
        },

        createCategoryI18n: function (params, callback) {
            mysql.query(sql.createCategoryI18n, params, function (res) {
                callback(res);
            });
        },

        updateCategoryI18n: function (params, callback) {
            this.getCategoryI18nById(params, function (category) {
                console.log(category);
                mysql.query(sql.updateCategoryI18n, extend(category, params), function (result) {
                    callback(result);
                });
            });
        },

        deleteCategory: function (params, callback) {
            mysql.query(sql.deleteCategory, params, function (res, fields) {
                callback(res);
            });
        },

        getAllCategories: function (callback) {
            mysql.query(sql.getAllCategories, function (res) {
                callback(res);
            });
        },

        getAllCategoryI18n: function (params, callback) {
            mysql.query(sql.getAllCategoryI18n, params, function (res) {
                callback(res);
            });
        },
        getCategoryI18nById: function (params, callback) {
            mysql.query(sql.getCategoryI18nById, params, function (res) {
                callback(res[0]);
            });
        },
        getCategoryById: function (params, callback) {
            mysql.query(sql.getCategoryById, params, function (res) {
                callback(res);
            });
        }
    };
})();

