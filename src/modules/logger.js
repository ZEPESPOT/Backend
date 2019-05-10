var moment = require('moment/moment')
var utils = require('../modules/utils')
var fs = require('fs')
require('colors')

exports.checkLogDir = () => {
    try{
        fs.mkdirSync('./logs');
    }
    catch(e){
        if ( e.code != 'EEXIST' ) throw e;
    }
}

exports.info = (msg, req) => {

    var time = moment().format('YYYY-MM-DD HH:mm:ss')

    console.log("INFO".green+" : "+msg)

    var ip = null
    if(req != undefined){
        ip = utils.getIp(req)
    }

    var data = 'INFO    '+msg+'    '+time+'    '+ip+'\n';
    var option = { encoding: 'utf8', flag: 'a+' };

    fs.writeFileSync('./logs/log', data, option);
}

exports.warning = (msg, req) => {

    var time = moment().format('YYYY-MM-DD HH:mm:ss')

    console.log("WARNING".yellow+" : "+msg)

    var ip = null
    if(req != undefined){
        ip = utils.getIp(req)
    }

    var data = 'WARNING    '+msg+'    '+time+'    '+ip+'\n';
    var option = { encoding: 'utf8', flag: 'a+' };

    fs.writeFileSync('./logs/log', data, option);
}

exports.fatal = (msg) => {

    var time = moment().format('YYYY-MM-DD HH:mm:ss')

    console.log("FATAL".red+" : "+msg)

    var data = 'FATAL    '+msg+'    '+time+'    '+null+'\n';
    var option = { encoding: 'utf8', flag: 'a+' };

    fs.writeFileSync('./logs/log', data, option);

}




