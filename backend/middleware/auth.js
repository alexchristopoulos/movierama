const AuthService = require('../services/auth');

/**
 * @description user authenticated middleware 
 */
exports.authenticated = async function(req, res, next) {

    try {
        let token = req.headers['authorization'].slice(7);

        if(!token)
            return res.sendStatus(400);
        
        return AuthService.isAuthenticated(token)?
            next():
            res.sendStatus(401);

    } catch(err) {
        return res.sendStatus(400);
    }
    
}