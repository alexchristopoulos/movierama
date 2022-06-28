const UserService = require('../services/user');
const errors = require('../errors');
const logger = require('../logger');
const logFormat = require('util').format;

const createUser = async (req, res, next) => {

    try {

        let user = req.body;
        let newUser = await UserService.createUser(user);
        logger.info(logFormat('Created user: ', newUser.email));
        return res.sendStatus(200);

    } catch(err) {

        logger.error(logFormat(err.name));
        return res.status(400).json(err);
    }
};

module.exports = {
    createUser: createUser
};