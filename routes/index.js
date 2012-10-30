
/*
 * GET home page.
 */

var category = require('../models/model_category');

exports.index = function (req, res) {
    var params = {
        name: 'Оeeqweдяжда',
        language_id: 1,
        category_id: 6
    };

    category.updateCategory(params, function (res) {
    });
};