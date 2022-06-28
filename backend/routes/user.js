const {body} = require('express-validator');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validationMiddleware = require('../middleware/validation');
const authenticated = require('../middleware/auth').authenticated;

/** GET /api/user: get user by session cookie */
router.get('/', authenticated, async (req, res, next) => {
    return res.sendStatus(200);
});

/** POST /api/user: create new user */
router.post('/', 
    body('email').isEmail().normalizeEmail(),
    body('firstname').isString(),
    body('lastname').isString(),
    body('password').isStrongPassword(),
    validationMiddleware.runValidations,
    userController.createUser
);

module.exports = router;