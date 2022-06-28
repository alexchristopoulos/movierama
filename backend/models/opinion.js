const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const collectionName = 'opinion';

let opinionSchema = new Schema({
    like: {
        type: Boolean,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' ,
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'movie',
        required: true,
    }
}, {
    collection: collectionName
});

opinionSchema.statics.postOpinion = async function(likes, userId, movieId) {
    
    //check no opinion for this movie
    let count = Array.from(await this.find({ movieId: movieId, postedBy: userId})).length;

    //if user has already submitted like or hate return false
    if(count > 0)
        return false;
    
    await this.create({
        like: likes,
        movieId: movieId,
        postedBy: userId
    });

    return true;
}

module.exports = mongoose.model(collectionName, opinionSchema, collectionName);