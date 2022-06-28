const User = require('../models/user');
const logger = require('../logger/index');
const logformat = require('util').format;
const errors = require('../errors');
const jws = require('jws');
const md5 = require('md5');

class UserService {

    constructor() {

    }

    /**
     * Used for user login
     * @param {username} email 
     * @param {password} password 
     * @returns user or error
     */
    async getUserByCredentials(email, password) {
        return await User.findByEmailPassword(email, password);
    }

    /**
     * @param {email} email 
     * @returns Error or void in case of success
     */
    async checkUserWithEmailExists(email) {

        let user = await User.findByEmail(email)
        if (user)
            throw new errors.UserExistsError();

        return;
    }

    /**
     * 
     * @param {userJson} userData 
     * @returns new user create in DB or undefined in error case
     */
    async createUser(userData) {

        await this.checkUserWithEmailExists(userData.email);
        return await User.create({
            firstname: userData.firstname,
            lastname: userData.lastname,
            password: md5(userData.password),
            email: userData.email,
        });        
    }

    /**
     * 
     * @param {token} jwt token 
     * @returns user data
     */
    async getUserFromToken(token, selectAll) {
        let payload = JSON.parse(jws.decode(token).payload);
        return selectAll?
            User.findOne({email: payload.email}):
            User.findByEmail(payload.email);
    }

    /**
     * 
     * @param {email} email 
     * @returns user id of whom the email belongs to
     */
    async getUserIdFromEmail(email) {
        let user = await User.findOne({ email: email });
        return  user._id;
    }
}

module.exports = new UserService();