const {body} = require('express-validator');
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');
const validationMiddleware = require('../middleware/validation');
const authenticated = require('../middleware/auth').authenticated;

/** GET all movies **/
router.get('/', 
    movieController.getMovies
);

/** POST /api/movie  create new movie */
router.post('/', 
    authenticated,
    body('title').isString(),
    body('description').isString(),
    validationMiddleware.runValidations,
    movieController.createMovie
);

/** POST /api/movie/opinion post like or hate  */
router.post('/opinion',
    authenticated,
    body('likes').isBoolean(),
    body('movieId').isString(),
    validationMiddleware.runValidations,
    movieController.postOpinion
);

/** DELETE /api/movie/opinion delete like or hate  */
router.delete('/opinion',
    authenticated,
    body('movieId').isString(),
    validationMiddleware.runValidations,
    movieController.deleteOpinion
);

/** GET /api/movie/opinion get list of all opinions */
router.get('/opinion',
    movieController.getOpinions
);

module.exports = router;