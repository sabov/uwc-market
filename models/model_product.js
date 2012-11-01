var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants');


module.exports = (function () {
    var sql = {
        createProduct: 'INSERT INTO product(category_id, amount, maker_id) VALUES(:category_id, :amount, :maker_id)',
        createProductI18n: 'INSERT INTO product_I18n(product_id, language_id, title, description, params) VALUES(:product_id, :language_id, :title, :description, :params)',
        deleteProduct: 'DELETE FROM product WHERE id = :productId',
        updateProduct: 'UPDATE product SET category_id = :category_id, amount = :amount, maker_id = :maker_id WHERE id = :product_id',
        updateProductI18n: 'UPDATE product_i18n SET title = :title, description = :description, params = :params WHERE product_id = :product_id AND product_i18n.language_id = :language_id',
        getProductI18nById: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.id = :product_id AND product_i18n.language_id = :language_id',
        getProductById: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.id = :product_id',
        getProductI18nByCategoryId: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.category_id = :category_id AND product_i18n.language_id = :language_id',
        getProductI18nByCategoryIdAndMakerId: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.category_id = :category_id AND product.maker_id = :maker_id AND product_i18n.language_id = :language_id',
        getAllProductI18n: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product_i18n.language_id = :language_id',
        getProductById: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.id = :product_id',
        getMakerByCategoryId: 'SELECT * from product INNER JOIN maker ON (product.maker_id = maker.id) WHERE product.category_id = :category_id'
    };

    var _createProductI18n = function (params, callback) {
        mysql.query(sql.createProductI18n, params, function (res) {
            if (res.length) {
                callback(res);
            }
        });
    };

    var _updateProductI18n = function (params, callback) {
        mysql.query(sql.updateProductI18n, params, function (res) {
            if (res.length) {
                callback(res);
            }
        });
    };

    return {
        //params = {category_id:'', amount:'', maker_id:'', language_id:'', title:'', description:''}
        createProduct: function (params, callback) {
            mysql.query(sql.createProduct, params, function (res, fields) {
                callback(res.insertId);
            });
        },
        getMakerByCategoryId: function (params, callback) {
            mysql.query(sql.getMakerByCategoryId, params, function (res) {
                callback(res);
            });
        },
        createProductI18n: function (params, callback) {
            mysql.query(sql.createProductI18n, params, function (res) {
                callback(res);
            });
        },
        //params = {id:'', title:'', category_id:'', amount:'', maker_id:'', language_id:'', title:'', description:''}
        updateProduct: function (params, callback) {
            mysql.query(sql.updateProduct, params, function (res, fields) {
                callback(res);
            });
        },
        updateProductI18n: function (params, callback) {
            mysql.query(sql.updateProductI18n, params, function (res) {
                callback(res);
            });
        },
        //params = {id:''}
        deleteProduct: function (params, callback) {
            mysql.query(sql.deleteProduct, params, function (res, fields) {
                callback(res);
            });
        },
        //params = {id:''}
        getProductI18nById: function (params, callback) {
            mysql.query(sql.getProductI18nById, params, function (res, fields) {
                callback(res);
            });
        },
        getProductById: function (params, callback) {
            mysql.query(sql.getProductById, params, function (res, fields) {
                callback(res);
            });
        },
        //params = {category_id:''}
        getProductI18nByCategoryId: function (params, callback) {
            mysql.query(sql.getProductI18nByCategoryId, params, function (res, fields) {
                callback(res);
            });
        },
        getProductI18nByCategoryIdAndMakerId: function (params, callback) {
            mysql.query(sql.getProductI18nByCategoryIdAndMakerId, params, function (res, fields) {
                callback(res);
            });
        },
        getAllProductI18n: function (params, callback) {
            mysql.query(sql.getAllProductI18n, params, function (res, fields) {
                callback(res);
            });
        }
    };
})();
