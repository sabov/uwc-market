var user = require('../models/model_user'),
    product = require('../models/model_product'),
    maker = require('../models/model_maker'),
    async = require('async'),
    category = require('../models/model_category'),
    dbConstants = require('../config/dbConstants');

var _prepareToUa = function (params) {
    params.language_id = dbConstants.UA_ID;
    params.description = params.description_ua;
    params.title = params.title_ua;
    return params;
};

var _prepareToRu = function (params) {
    params.language_id = dbConstants.RU_ID;
    params.description = params.description_ru;
    params.title = params.title_ru;
    return params;
};

var _updateProductWithI18n = function (params, callback) {
    product.updateProduct(params, function (productId) {
        params = _prepareToUa(params);
        product.updateProductI18n(params, function (result) {
            params = _prepareToRu(params);
            product.updateProductI18n(params, function (result) {
                callback(result);
            });
        });
    });
};

var _createProductWithI18n = function (params, callback) {
    product.createProduct(params, function (productId) {
        params.product_id = productId;
        params = _prepareToUa(params);
        product.createProductI18n(params, function () {
            params = _prepareToRu(params);
            product.createProductI18n(params, function () {
                callback(productId);
            });
        });
    });
};

//combine ru and ua version of product, for back office view
var _combineI18nProducts = function (products) {
    var hybridProduct = products[0],
        isRuI18n = (products[0].language_id && dbConstants.RU_ID);
    hybridProduct.title_ru = isRuI18n ? products[0].title : products[1].title;
    hybridProduct.description_ru = isRuI18n ? products[0].description : products[1].description;
    hybridProduct.title_ua = isRuI18n ? products[1].title : products[0].title;
    hybridProduct.description_ua = isRuI18n ? products[1].description : products[0].description;
    return hybridProduct;
};

var _mapCategoriesAndMakers = function (category, callback) {
    var params = {
        category_id:category.category_id
    };
    product.getMakerByCategoryId(params, function (makers) {
        category.makers = makers;
        callback(false, category);
    });
}

var _getCategoryI18n = function (params, callback) {
    category.getAllCategoryI18n(params, function (categories) {
        async.map(categories, _mapCategoriesAndMakers, function (errorElem) {
            callback(categories);
        });
    });
}

var _getProductI18nByCategoryIdAndMakerId = function (params, callback) {
    product.getProductI18nByCategoryIdAndMakerId(params, function (result) {
        callback(result);
    });
}

var _getProductI18nByCategoryId = function (params, callback) {
    product.getProductI18nByCategoryId(params, function (result) {
        callback(result);
    });
}

module.exports = {
    default: function (req, res) {
        var params = req.body;
        product.getAllProductI18n(params, function (products) {
            _getCategoryI18n(params, function(categories) {
                res.render('product/admin_default', {
                    products: products,
                    categories: categories
                });
            });
        });
    },

    create: function (req, res) {
        var params = req.body;
        _createProductWithI18n(params, function (productId) {
            res.redirect('/admin/product/' + productId);
        })
    },

    edit: function (req, res) {
        var params = req.body;
        params.product_id =  req.route.params.product_id;
        product.getProductById(params, function (products) {
            category.getAllCategoryI18n(params, function (categories) {
                maker.getAllMakers(function (makers) {
                    res.render('product/admin_edit', {
                        product: _combineI18nProducts(products),
                        categories: categories,
                        makers: makers,
                        params: params
                    });
                })
            })
        });
    },

    update: function (req, res) {
        var params = req.body;
        params.product_id = req.route.params.product_id;
        _updateProductWithI18n(params, function () {
            res.redirect('/admin/product/category/' + params.category_id + '/maker/' + params.maker_id);
        });
    },

    categoryAndMaker: function (req, res) {
        var params = req.body;
        params.category_id = req.route.params.category_id;
        params.maker_id = req.route.params.maker_id;
        _getProductI18nByCategoryIdAndMakerId(params, function (products) {
            _getCategoryI18n(params, function(categories) {
                res.render('product/admin_default', {
                    categories: categories,
                    products: products,
                    params: params
                });
            })
        });
    },

    category: function (req, res) {
        var params = req.body;
            params.category_id = req.route.params.category_id;
        _getProductI18nByCategoryId(params, function (products) {
            _getCategoryI18n(params, function(categories) {
                res.render('product/admin_default', {
                    categories: categories,
                    products: products,
                    params: params
                });
            })
        });
    }
};
