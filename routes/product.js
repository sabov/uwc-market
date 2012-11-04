var user = require('../models/model_user'),
    crypto = require('crypto'),
    modelProduct = require('../models/model_product'),
    maker = require('../models/model_maker'),
    async = require('async'),
    fs = require('fs'),
    extend = require('xtend');
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
    modelProduct.updateProduct(params, function (productId) {
        params = _prepareToUa(params);
        modelProduct.updateProductI18n(params, function (result) {
            params = _prepareToRu(params);
            modelProduct.updateProductI18n(params, function (result) {
                callback(result);
            });
        });
    });
};

var _createProductWithI18n = function (params, callback) {
    modelProduct.createProduct(params, function (productId) {
        params.product_id = productId;
        params = _prepareToUa(params);
        modelProduct.createProductI18n(params, function () {
            params = _prepareToRu(params);
            modelProduct.createProductI18n(params, function () {
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
        category_id: category.category_id
    };
    modelProduct.getMakerByCategoryId(params, function (makers) {
        category.makers = makers;
        callback(false, category);
    });
};

var _getCategoryI18n = function (params, callback) {
    modelProduct.getAllCategoryWithProducts(params, function (categories) {
        async.map(categories, _mapCategoriesAndMakers, function (error) {
            callback(categories);
        });
    });
};

var _getProductI18nByCategoryIdAndMakerId = function (params, callback) {
    modelProduct.getProductI18nByCategoryIdAndMakerId(params, function (result) {
        callback(result);
    });
};

var _getProductI18nByCategoryId = function (params, callback) {
    modelProduct.getProductI18nByCategoryId(params, function (result) {
        callback(result);
    });
};

var _uploadFile = function (file, callback) {
    file.name = crypto.createHash('md5').update(file.name).digest("hex") + file.name;
    fs.rename(file.path, process.cwd() + '/public/img/products/' + file.name, function (err) {
        callback(false, file.name);
    });
};

var _uploadFileList = function (files, callback) {
    async.map(files, _uploadFile, function (err) {
        callback(files);
    });
};

var _attachImagesToProduct = function (products, callback) {
    if (!(products instanceof Array)) {
        products = [products];
    }
    async.map(products, function (product, next) {
        modelProduct.getProductImage(product, function (images) {
            product.images = images;
            next(false, product);
        });
    }, function (err, products) {
        callback(products);
    });
};

//insert array of product_image
var _createProductImages = function (params, files, callback) {
    var allowFormats = /image\/jpeg|image\/png/;
    var isImage = function (image, callback) {
        callback(!!image.type.match(allowFormats));
    };
    var _insertProductImageList = function (params) {
        async.forEach(params.images, function (image, next) {
            params.image_name = image.name;
            modelProduct.createProductImage(params, function (inserId) {
                if (!inserId) {
                    next(true);
                } else {
                    next(false);
                }
            });
        }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    };
    if (!(files instanceof Array)) {
        files = [files];
    }
    async.filter(files, isImage, function (images) {
        _uploadFileList(images, function (images) {
            params.images = images;
            _insertProductImageList(params, function (err) {
                callback(err);
            });
        });
    });
};

var actions = {
    default: function (req, res, view) {
        var params = req.query;
//        params = extend(params.query);
        params.current_category_id = req.route.params.category_id || '';
        params.current_maker_id = req.route.params.maker_id || '';
        modelProduct.getAllProductI18n(params, function (products) {
            _getCategoryI18n(params, function (categories) {
                _attachImagesToProduct(products, function (products) {
                    res.render(view, {
                        products: products,
                        categories: categories,
                        params: params
                    });
                });
            });
        });
    },

    create: function (req, res) {
        var params = req.body;
        _createProductWithI18n(params, function (productId) {
            res.redirect('/' + productId);
        });
    },

    delete: function (req, res) {
        modelProduct.deleteProduct({product_id: req.route.params.product_id}, function () {
            res.redirect('back');
        });
    },

    edit: function (req, res, view) {
        var params = req.body,
            product;

        params.product_id =  req.route.params.product_id;
        modelProduct.getProductById(params, function (products) {
            product = _combineI18nProducts(products);
            category.getAllCategoryI18n(params, function (categories) {
                maker.getAllMakers(params, function (makers) {
                    _attachImagesToProduct(product, function (productWithImages) {
                        res.render(view, {
                            product: product,
                            categories: categories,
                            makers: makers,
                            params: params
                        });
                    });
                });
            });
        });
    },

    update: function (req, res) {
        var params = req.body;
        params.product_id = req.route.params.product_id;
        _updateProductWithI18n(params, function () {
            _createProductImages(params, req.files.images, function (err) {
                res.redirect('/category/' + params.category_id + '/maker/' + params.maker_id);
            });
        });
    },

    categoryAndMaker: function (req, res, view) {
        var params = req.body;
        params.category_id = req.route.params.category_id;
        params.maker_id = req.route.params.maker_id;
        _getProductI18nByCategoryIdAndMakerId(params, function (products) {
            _getCategoryI18n(params, function (categories) {
                _attachImagesToProduct(products, function (products) {
                    res.render(view, {
                        categories: categories,
                        products: products,
                        params: params
                    });
                });
            });
        });
    },

    category: function (req, res, view) {
        var params = req.body;
        params.category_id = req.route.params.category_id;
        _getProductI18nByCategoryId(params, function (products) {
            _getCategoryI18n(params, function (categories) {
                _attachImagesToProduct(products, function (products) {
                    res.render(view, {
                        categories: categories,
                        products: products,
                        params: params
                    });
                });
            });
        });
    }
};


module.exports = {
    default: function (req, res) {
        actions.default(req, res, 'product/_default');
    },

    create: function (req, res) {
        actions.create(req, res);
    },

    delete: function (req, res) {
        actions.delete(req, res);
    },

    edit: function (req, res) {
        actions.edit(req, res, 'product/_edit');
    },

    show: function (req, res) {
        actions.edit(req, res, 'product/_show');
    },

    update: function (req, res) {
        actions.update(req, res);
    },

    categoryAndMaker: function (req, res) {
        actions.categoryAndMaker(req, res, 'product/_default');
    },

    category: function (req, res) {
        actions.category(req, res, 'product/_default');
    }
};
