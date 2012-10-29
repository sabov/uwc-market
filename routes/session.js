
/*
 * GET users listing.
 */

var mysql = require('../libs/mysql')

exports.new = function(req, res){

//    req.session.user = 'abla';
//    mysql.query('SELECT * FROM $1', ['groups'], function (res, fields) {
    console.log(req.session.user);
//    });

    res.send("respond with a resource");
};
exports.session = function(req, res){
    req.session.user = 'abla';
    res.send("take a username");
};

