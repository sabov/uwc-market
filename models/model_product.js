var mysql = require('../libs/mysql'),
    crypto = require('crypto'),
    dbConstants = require('../config/dbConstants');

module.exports = (function () {
    var sql = {
        createProduct: 'INSERT INTO product(category_id, amount, maker_id) VALUES(:category_id, :amount, :maker_id)',
        createProductI18n: 'INSERT INTO product_I18n(product_id, language_id, title, description, params) VALUES(:product_id, :language_id, :title, :description, :params)',
        deleteProduct: 'DELETE FROM product WHERE id = :product_id',
        updateProduct: 'UPDATE product SET category_id = :category_id, amount = :amount, maker_id = :maker_id WHERE id = :product_id',
        updateProductI18n: 'UPDATE product_i18n SET title = :title, description = :description, params = :params WHERE product_id = :product_id AND product_i18n.language_id = :language_id',
        createProductImage: 'INSERT INTO product_image(image_name, product_id) VALUES(:image_name,:product_id)',
        getProductImage: 'SELECT * FROM product INNER JOIN product_image ON (product.id = product_image.product_id) WHERE product.id = :product_id',
        getProductI18nById: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.id = :product_id AND product_i18n.language_id = :language_id',
        getProductById: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.id = :product_id',
        getProductI18nByCategoryId: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.category_id = :category_id AND product_i18n.language_id = :language_id',
        getProductI18nByCategoryIdAndMakerId: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product.category_id = :category_id AND product.maker_id = :maker_id AND product_i18n.language_id = :language_id',
        getAllProductI18n: 'SELECT * FROM product INNER JOIN product_i18n ON (product.id = product_i18n.product_id) WHERE product_i18n.language_id = :language_id',
        getMakerByCategoryId: 'SELECT DISTINCT maker.id as maker_id, maker.name from product INNER JOIN maker ON (product.maker_id = maker.id) WHERE product.category_id = :category_id',
        getAllCategoryWithProducts: 'SELECT DISTINCT r1.category_id, r1.name from (SELECT category_i18n.* FROM category INNER JOIN category_i18n ON (category.id = category_i18n.category_id) WHERE category_i18n.language_id = :language_id) as r1 INNER JOIN product ON (product.category_id = r1.category_id)',
        deleteImage: 'DELETE FROM product_image WHERE id = :image_id'
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
        createProductImage: function (params, callback) {
            mysql.query(sql.createProductImage, params, function (res, fields) {
                callback(res.insertId);
            });
        },
        getProductImage: function (params, callback) {
            mysql.query(sql.getProductImage, params, function (res, fields) {
                callback(res);
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
        },
        getAllCategoryWithProducts: function (params, callback) {
            mysql.query(sql.getAllCategoryWithProducts, params, function (res) {
                callback(res);
            });
        },
        deleteImage: function (params, callback) {
            mysql.query(sql.deleteImage, params, function (res) {
                callback(res);
            });
        }
    };
})();

