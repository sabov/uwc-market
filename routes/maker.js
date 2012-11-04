var user = require('../models/model_user'),
    async = require('async'),
    modelMaker = require('../models/model_maker'),
    dbConstants = require('../config/dbConstants');


var _combineI18nMakers = function (makers) {
    var hybridMaker = makers[0],
        isRu = (hybridMaker.language_id === dbConstants.RU_ID);
    hybridMaker.name_ru = isRu ? makers[0].name : makers[1].name;
    hybridMaker.name_ua = isRu ? makers[1].name : makers[0].name;
    return hybridMaker;
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

var _updateMakerWithI18n = function (params, callback) {
    params = _prepareToUa(params);
    modelMaker.updateMakerI18n(params, function (result) {
        params = _prepareToRu(params);
        modelMaker.updateMakerI18n(params, function (result) {
            callback(result);
        });
    });
};


module.exports = {
    list: function (req, res) {
        var params = req.body;
        modelMaker.getAllMakers(params, function (makers) {
            res.render('maker/_list', {
                makers: makers,
                nameI18n: res.locals.__i.Makers,
                name: 'maker'
            });
        });
    },
    delete: function (req, res) {
        var params = req.body;
        params.maker_id = req.route.params.maker_id;
        modelMaker.deleteMaker(params, function (result) {
            res.redirect('/maker');
        });
    },
    create: function (req, res) {
        var params = req.body;
        params.name = '';
        modelMaker.createMaker(params, function (makerId) {
            res.redirect('/maker/update/' + makerId);
        });
    },
    edit: function (req, res) {
        var params = req.body;
        params.maker_id = req.route.params.maker_id;
        modelMaker.getMakerById(params, function (maker) {
            maker.maker_id = params.maker_id;
            res.render('maker/_edit', {
                maker: maker
            });
        });
    },
    update: function (req, res) {
        var params = req.body;
        params.maker_id = req.route.params.maker_id;
        modelMaker.updateMaker(params, function () {
            res.redirect('/maker');
        });
    }
};

