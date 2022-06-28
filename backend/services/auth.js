const UserService = require('./user');
const logger = require('../logger');
const logFormat = require('util').format;
const config = require('../config');
const errors = require('../errors');
const jws = require('jws');

//jws.verify(signature, algorithm, secretOrKey)
class AuthService {

    constructor() {

    }

    /**
     * 
     * @param {email} email 
     * @param {password} password 
     * @returns JSON including jwt token with basic user info
     */
    async login(email, password) {
        
                        
        let user = await UserService.getUserByCredentials(email, password);
            
        if(!user)
            throw new errors.LoginUserError();
        
        const signature = jws.sign({
                header: { alg: config.jws.alg },
                payload: {
                    ...user['_doc'],
                    exp: Math.floor(Date.now() / 1000) + config.jws.exp,
                    iat: Math.floor(Date.now() / 1000),
                    iss: 'movie-rama-backend'
                },
                secret: config.jws.secret,
            });

        logger.info(logFormat('Successfully Authenticated: ', user.email, ' - ', user.firstname, ' - ', user.lastname));

        return {
            ...user['_doc'],
            token: signature
        };             
    }

    /**
     * @description method that checks if a session is valid given jws signature
     * @returns true or false where the jwt sent among with the request is signed with the correct secret 
     */
    isAuthenticated(token) {
        try {

            let tmp = jws.decode(token);
            let exp = JSON.parse(jws.decode(token)['payload'])["exp"];

            if(exp && exp <= Math.floor(Date.now() / 1000))
                return false;
            
            return jws.verify(token, config.jws.alg, config.jws.secret);

        } catch(err) {

            return false;
        }
    }
}

module.exports = new AuthService();