const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const collectionName = 'movie';

let movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    },
    publishedAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    }
}, {
    collection: collectionName
});

movieSchema.statics.findAll = function() {
    return this.find().populate('postedBy', 'firstname lastname email');
}

module.exports = mongoose.model(collectionName, movieSchema, collectionName);