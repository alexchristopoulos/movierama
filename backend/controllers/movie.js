const { Logform } = require('winston');
const MovieService = require('../services/movie');
const UserService = require('../services/user');
const AuthService = require('../services/auth');
const logger = require('../logger');
const logFormat = require('util').format;

exports.createMovie = async (req, res, next) => {
    try {

        let title = req.body.title;
        let description = req.body.description;
        let user = await UserService.getUserFromToken(req.headers['authorization'].slice(7), true);
        let publishedAt = new Date(Date.now()).toUTCString();

        await MovieService.createMovie(title, description, user, publishedAt);
        logger.info(logFormat('Created new movie by the user:', user));
        return res.sendStatus(200);
        
    } catch(err) {
        logger.error(logFormat(err));
        return res.sendStatus(500);
    }
};

exports.getMovies = async (req, res, next) => {
    try {

        let author = undefined;
        let sortBy = undefined;

        if(req.query){
            author=req.query.author;
            sortBy=req.query.sortBy;
        }

        let token = req.headers['authorization']?
            req.headers['authorization'].slice(7):
            undefined; 

        let movies = token?
            await MovieService.getMovies(token, sortBy, author):
            await MovieService.getMovies(false, sortBy, author);

        logger.info('Fetched all movies list');
        return res.status(200).json(movies);

    } catch(err) {
        logger.error(logFormat(err));
        return res.sendStatus(500);
    }
};

exports.deleteMovie = async (req, res, next) => {

}

exports.postOpinion = async (req, res, next) => {
    try {
        let token = req.headers['authorization'].slice(7);
        let likes = req.body.likes;
        let movieId = req.body.movieId;

        let opinion = await MovieService.createOpinion(likes, token, movieId);
        
        return opinion?
                res.status(200).json(opinion):
                res.sendStatus(409);//user already registered opinion for this movie
    } catch(err){
        logger.error(logFormat(err));
        return res.sendStatus(500);
    }
}

exports.getOpinions = async (req, res, next) => {
    try {

        return res.status(200).json(await MovieService.getOpinions());
        
    } catch(err) {
        logger.error(logFormat(err));
        return res.sendStatus(500);
    }

}

exports.deleteOpinion = async (req, res, next) => {
    try {

        let token = req.headers['authorization'].slice(7);
        let movieId = req.body.movieId;
        
        let result = await MovieService.deleteOpinion(token, movieId);

        return result.deletedCount > 0?
            res.sendStatus(200):
            res.sendStatus(404);

    } catch(err) {
        logger.error(logFormat(err));
        return res.sendStatus(500);
    }

}