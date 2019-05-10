exports.getIp = (req) =>{
    var ipAddress;

    var forwardedIpsStr = req.header('x-forwarded-for');

    if(forwardedIpsStr){
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
        if(ipAddress == "::1"){
            ipAddress = "127.0.0.1"
        }
        else{
            ipAddress = forwardedIps[0].split(":")[3]
        }
    }
    if(!ipAddress){
        ipAddress = req.connection.remoteAddress
        if(ipAddress == "::1"){
            ipAddress = "127.0.0.1"
        }
        else {
            ipAddress = ipAddress.split(":")[3]
        }
    }

    return ipAddress;
}
