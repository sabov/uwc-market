var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants');


module.exports = (function () {
    var sql = {
        createProduct: 'INSERT INTO product(category_id, amount, maker_id) VALUES(:category_id, :amount, :maker_id)',
        createProductI18n: 'INSERT INTO product_I18n(product_id, language_id, title, description, raw) VALUES(:product_id, :language_id, :title, :description, :raw)',
        deleteProduct: 'DELETE FROM product WHERE id = :id',
        updateProduct: 'UPDATE product SET category_id = :category_id, amount = :amount, maker_id = :maker_id WHERE id = :id',
        updateProductI18n: 'UPDATE product_i18n SET language_id = :language_id, title = :title, description = :description, raw = :raw WHERE product_id = :product_id',
        getProductsByCategoryId: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.category_id = :category_id',
        getAllProducts: 'SELECT * FROM products',
        setProductAttributeValue: 'INSERT'
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
                params.product_id = res.insertId;
                _createProductI18n(params, function (res) {
                    callback(res);
                });
            });
        },
        //params = {id:'', title:'', category_id:'', amount:'', maker_id:'', language_id:'', title:'', description:''}
        updateProduct: function (params, callback) {
            mysql.query(sql.updateProduct, params, function (res, fields) {
                if (res) {
                    params.product_id = params.id;
                    _updateProductI18n(params, function (res) {
                        callback(res);
                    });
                }
            });
        },
        //params = {id:''}
        deleteProduct: function (params, callback) {
            mysql.query(sql.deleteProduct, params, function (res, fields) {
                callback(res);
            });
        },
        //params = {category_id:''}
        getProductsByCategoryId: function (params, callback) {
            mysql.query(sql.getProductsByCategoryId, params, function (res, fields) {
                callback(res);
            });
        },
        setProductAtributeValue: function (params, calback) {

        }
    };
})();
