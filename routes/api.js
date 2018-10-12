var express = require("express");
var router  = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "afcon"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

router.get("/", function(req, res){
    res.render('index');
});

router.get("/data/:year", function(req, res){
    var q = 'SELECT * FROM events where ' + req.params.year;
    con.query(q, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.get("/stadiums/:year", function(req, res){
    var q = 'SELECT * FROM stadiums where ' + req.params.year;
    con.query(q, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.get("/stats/:year", function(req, res){
    var q = 'SELECT * FROM stats where ' + req.params.year;
    con.query(q, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;