import { all } from '@redux-saga/core/effects';

import {watchLogin, watchCheckToken, watchCreateMovie, watchDeleteMovieOpinion, watchRegister, watchCreateMovieOpinion, watchGetMovies} from './saga';


export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchCheckToken(),
        watchCreateMovie(),
        watchDeleteMovieOpinion(),
        watchRegister(),
        watchCreateMovieOpinion(),
        watchGetMovies()
    ])
};