const AuthService = require('../services/auth');
const config = require('../config');
const errors = require('../errors');
const logger = require('../logger');
const logFormat = require('util').format;
const UserService = require('../services/user');

exports.loginUser = async (req, res, next) => {
    try {
        const session = await AuthService.login(req.body.username, req.body.password);
        return res.status(200).json(session);
    } catch(err) {
        return res.status(401).json(err);
    }
};

exports.isAuthenticated = async (req, res, next) => {
    try {
        
        let token = req.headers['authorization'].slice(7);
        if( AuthService.isAuthenticated(token) ) {
           return res.sendStatus(200)
        } else {
            return res.sendStatus(401);
        }
    } catch(err) {
        return res.sendStatus(401);
    }
};

exports.getUserFromToken = async (req, res, next) => {
    try{
       
        let token = req.headers['authorization'].slice(7);
        let user = await UserService.getUserFromToken(token);
        
        return user?
            res.status(200).json(user):
            res.sendStatus(404);

    }catch(err) {
        return res.sendStatus(401);
    }
};