const mysql = require('mysql')
const syncmysql = require('sync-mysql')
const properties = require('../config/properties.json')
const logger = require('./logger')

const sqlConfig = {
    host: properties.dbconfig.db_host,
    port: properties.dbconfig.db_port,
    user: properties.dbconfig.db_user,
    password: properties.dbconfig.db_password,
    database: properties.dbconfig.db_name
}

var syncsql = new syncmysql(sqlConfig);
var sql = mysql.createConnection(sqlConfig);

var db = sql.connect((err)=>{
    if (err) {
        logger.fatal('MySQL Connection Error');
        throw err;
    }
    else {
        logger.info('DB Connect Success!');
    }
});

function handleDisconnect(client) {

    client.on('error', (error)=>{

        if (!error.fatal) return;

        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

        logger.info('> Re-connecting lost MySQL connection');

        setTimeout(()=>{
            sql.destroy()
            sql = mysql.createConnection(sqlConfig)
            handleDisconnect(sql)
            db = sql.connect()
            exports.db = db
            exports.sql = sql
        }, 1000);
    })
};

handleDisconnect(sql)

exports.db = db
exports.sql = sql
exports.syncsql = syncsql
