const { validationResult } = require('express-validator');

module.exports = {
    runValidations: (req, res, next) => {
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty())
            return res.status(400).json(validationErrors.array().map(verror => { return {field: verror.param, msg: verror.msg} }));
        else 
            return next();
        }
}