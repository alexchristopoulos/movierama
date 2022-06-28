const Movie = require('../models/movie');
const Opinion = require('../models/opinion');
const UserService = require('../services/user');
const logFormat = require('util').format;
const jws = require('jws');
const logger = require('../logger');

class MovieService {

    constructor(){

    }

    /**
     * 
     * @param {title} title of movie
     * @param {description} description of movie
     * @param {user} user object of movie post creator
     * @param {publishedAt} publishedAt date.now()
     */
    async createMovie(title, description, user, publishedAt) {
        try {
            await Movie.create({
                title: title,
                description: description,
                postedBy: user,
                publishedAt: publishedAt
            });
        } catch(err){
            throw err;
        }
    }

    _getMoviesPromisesArray(movies, email, userId, specifiedAuthor) {

        let promArr = [];

        for (let m in movies) {

            let movie = movies[m];
            if(specifiedAuthor && movie.postedBy.email != specifiedAuthor)
                continue;

            promArr.push(new Promise(async (resolve, reject) => {
                                    
                //requested by a user who is the owner of this movie
                const isOwner = movie.postedBy.email == email;

                const likesCount = await Opinion.count({ like: true, movieId: movie._id});
                const hatesCount = await Opinion.count({ like: false, movieId: movie._id});
                
                
                if(email) {//logged in user

                    const userOpinionResult = await Opinion.findOne({ movieId: movie._id, postedBy: userId }).select('like');
                    
                    let userOpinion = undefined;

                    //1 > like | 2 > hate

                    if(userOpinionResult){
                        userOpinion = userOpinionResult.like?1:2;
                    }

                    const movieResult = {
                        _id: movie._id,
                        isOwner: isOwner,
                        likes: likesCount,
                        hates: hatesCount,
                        userOpinion: userOpinion,
                        title: movie.title,
                        ownerEmail: movie.postedBy.email,
                        owner: movie.postedBy.firstname + " " + movie.postedBy.lastname,
                        description: movie.description,
                        publishedAt: movie.publishedAt
                    };

                    resolve(movieResult);
                } else{ //guest
                    const moviesResult = {
                        _id: movie._id,
                        likes: likesCount,
                        hates: hatesCount,
                        title: movie.title,
                        ownerEmail: movie.postedBy.email,
                        owner: movie.postedBy.firstname + " " + movie.postedBy.lastname,
                        description: movie.description,
                        publishedAt: movie.publishedAt
                    };

                    resolve(moviesResult);  
                }
            }).catch(err => {
                reject(err)
            }));
        }
        
        return promArr;
    }

    /**
     * 
     * @returns list of all movies
     */
    async getMovies(authenticated, sortBy, author) {

        let movies = Array.from(await Movie.findAll().populate('user', 'firstname lastname email'));

        if(authenticated){

            const email = JSON.parse(jws.decode(authenticated).payload)['email'];
            const userId = await UserService.getUserIdFromEmail(email);

            logger.info(logFormat('Fetching movies for authenticated user')); 

            let moviesResult = await Promise.all(this._getMoviesPromisesArray(movies, email, userId, author));
            
            if(sortBy) {
                if(sortBy == 0) {
                    moviesResult=moviesResult.sort(this._sortByLikes);
                } else if (sortBy == 1) {
                    moviesResult=moviesResult.sort(this._sortByHates);
                } else if (sortBy == 2) {
                    moviesResult=moviesResult.sort(this._sortByPublishedDate);
                }
            }

            return {
                authenticated: true,
                movies: moviesResult
            };
        } else {

            let moviesResult = await Promise.all(this._getMoviesPromisesArray(movies, undefined, undefined, author));

            logger.info(logFormat('Fetching movies for guest'));

            if(sortBy) {
                    if(sortBy == 0) {
                        moviesResult=moviesResult.sort(this._sortByLikes);
                    } else if (sortBy == 1) {
                        moviesResult=moviesResult.sort(this._sortByHates);
                    } else if (sortBy == 2) {
                        moviesResult=moviesResult.sort(this._sortByPublishedDate);
                    }
            }

            return {
                authenticated: false,
                movies: moviesResult
            };
        }
    }

    /*async deleteMovie() {
    }*/

    /**
     * inserts like or hate in db
     * @param {likes} likes true or false wether user likes or not the movie
     * @param {token} token jwt token of user
     * @param {movieId} movieId 
     * @returns 
     */
    async createOpinion(likes, token, movieId){
        let email = JSON.parse(jws.decode(token).payload)['email'];
        let id = await UserService.getUserIdFromEmail(email);
        return await Movie.count({postedBy: id, _id: movieId}) > 0 ? //user is not owner of this movie
            false:
            await Opinion.postOpinion(likes, id, movieId);
    }

    /**
     * deletes like or hate from db for a movie for a user
     * @param {token} token 
     * @param {movieId} movieId 
     * @returns 
     */
    async deleteOpinion(token, movieId){
        const email = JSON.parse(jws.decode(token).payload)['email'];
        const userId = await UserService.getUserIdFromEmail(email);
        return await Opinion.deleteOne({postedBy: userId, movieId: movieId});
    }

    /**
     * 
     * @param {movieId} movieId 
     * @returns a list of all likes/hates
     */
    async getOpinions(movieId){
        return movieId?
                await Opinion.find({movieId: movieId}).populate('postedBy movieId', 'firstname lastname email title'):
                await Opinion.find().populate('postedBy movieId', 'firstname lastname email title');
    }


    _sortByHates(a, b) {
        var keyA = a.hates,
        keyB = b.hates;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    }

    _sortByLikes(a, b) {
        var keyA = a.likes,
        keyB = b.likes;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    }

    _sortByPublishedDate(a, b) {
        var keyA = new Date(a.publishedAt),
        keyB = new Date(b.publishedAt);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    }
}

module.exports = new MovieService();