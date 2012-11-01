
/*
 * GET home page.
 */

var category = require('../models/model_category'),
    maker = require('../models/model_maker'),
    product = require('../models/model_product');

exports.index = function (req, res) {
    var params = {
        id: 9,
        title: '________',
        language_id: '1',
        description: 'nice nice nice',
        amount: '11',
        category_id: '1',
        maker_id: '1',
        raw: 'sdasd asd as asd as asd asd asd ad as das '
    };

    product.updateProduct(params, function (res) {
        console.log(res);
    });
};