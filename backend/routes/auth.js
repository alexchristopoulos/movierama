var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const validationMiddleware = require('../middleware/validation');
const { body } = require('express-validator');
const authenticated = require('../middleware/auth').authenticated;

/**
 * POST /api/auth login user and send back jwt with user info
 */
router.post('/',
    body('username').isString(),
    body('password').isString(),
    validationMiddleware.runValidations,
    authController.loginUser
);

/**
 * GET /api/auth checks if jwt token sent is signed
 */
router.get('/', 
    authController.isAuthenticated
);

/**
 * GET /api/auth/user checks if jwt token sent is signed
 */
 router.get('/user', 
 validationMiddleware.runValidations,
 authenticated,
 authController.getUserFromToken
);

module.exports = router;