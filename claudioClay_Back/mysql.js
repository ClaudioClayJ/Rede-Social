const mysql =require("mysql");

var pool =mysql.createPool({
    "user":"root",
    "password":"",
    "database":"claudio",
    "host":"localhost",
    "port":3306

});

exports.pool=pool;