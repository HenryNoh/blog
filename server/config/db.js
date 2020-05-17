const mysql = require('mysql');

const db = mysql.createPool({
    host: 'blog-1.cctfvrol48so.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: '11111111',
    database: 'blog'
});

module.exports = db;