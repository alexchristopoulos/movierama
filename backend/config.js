module.exports = {
    server: {
        port: 3000,
        hostname: 'localhost',
        protocol: 'http'
    },
    db: {
        uri: 'mongodb://127.0.0.1:27017/movierama',
    }, 
    jws: {
        alg: 'HS256',
        exp: 3600000,//jwt token lifetime in seconds
        secret: 'hGe56#_2'//jwt sign/verify secret
    }
};