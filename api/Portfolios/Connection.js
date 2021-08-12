const mysql = require('mysql');
//database connection

var conn = mysql.createConnection({
    host : 'yottol-rds.copzpeo4bk3d.ap-south-1.rds.amazonaws.com',
    user : 'root',
    password : 'BxCdkbmW8gVG1Cj5jpA0',
    database : 'yottol-stocks'
});

var __dbConnection__ = conn
module.exports = {conn,mysql,__dbConnection__};