var user = require('../models/model_user'),
    async = require('async'),
    modelCategory = require('../models/model_category'),
    dbConstants = require('../config/dbConstants');


var _combineI18nCategories = function (categories) {
    var hybridCategory = categories[0],
        isRu = (hybridCategory.language_id === dbConstants.RU_ID);
    hybridCategory.name_ru = isRu ? categories[0].name : categories[1].name;
    hybridCategory.name_ua = isRu ? categories[1].name : categories[0].name;
    return hybridCategory;
};

var _prepareToUa = function (params) {
    params.language_id = dbConstants.UA_ID;
    params.name = params.name_ua;
    return params;
};

var _prepareToRu = function (params) {
    params.language_id = dbConstants.RU_ID;
    params.name = params.name_ru;
    return params;
};

var _createCategoryWithI18n = function (params, callback) {
    modelCategory.createCategory(params, function (categoryId) {
        params.category_id = categoryId;
        params = _prepareToUa(params);
        modelCategory.createCategoryI18n(params, function () {
            params = _prepareToRu(params);
            modelCategory.createCategoryI18n(params, function () {
                callback(categoryId);
            });
        });
    });
};

var _updateCategoryWithI18n = function (params, callback) {
    params = _prepareToUa(params);
    modelCategory.updateCategoryI18n(params, function (result) {
        params = _prepareToRu(params);
        console.log(params);
        modelCategory.updateCategoryI18n(params, function (result) {
            callback(result);
        });
    });
};


module.exports = {
    list: function (req, res) {
        var params = req.body;
        modelCategory.getAllCategoryI18n(params, function (categories) {
            res.render('category/_list', {
                categories: categories,
                nameI18n: res.locals.__i.Categories,
                name: 'category'
            });
        });
    },
    delete: function (req, res) {
        var params = req.body;
        params.category_id = req.route.params.category_id;
        modelCategory.deleteCategory(params, function (result) {
            res.redirect('/category');
        });
    },
    create: function (req, res) {
        var params = req.body;
        _createCategoryWithI18n(params, function (categoryId) {
            res.redirect('/category/update/' + categoryId);
        });
    },
    edit: function (req, res) {
        var params = req.body,
            category;
        params.category_id = req.route.params.category_id;
        modelCategory.getCategoryById(params, function (categories) {
            category = _combineI18nCategories(categories);
            res.render('category/_edit', {
                category: category
            });
        });
    },
    update: function (req, res) {
        var params = req.body;
        params.category_id = req.route.params.category_id;
        _updateCategoryWithI18n(params, function (result) {
            res.redirect('/category');
        });
    }
};

