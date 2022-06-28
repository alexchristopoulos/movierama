import * as auth from './auth';
import * as movie from './movie';

const api = {
    auth: {
        login: auth.login,
        checkToken: auth.checkToken,
        register: auth.register
    },
    movie: {
        createMovie: movie.createMovie,
        getMovies: movie.getMovies,
        createMovieOpinion: movie.createMovieOpinion,
        deleteMovieOpinion: movie.deleteMovieOpinion
    }
};

export default api;