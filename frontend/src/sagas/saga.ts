import { takeLatest } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import api from '../api';
import * as Effects from 'redux-saga/effects';

const call:any = Effects.call;

function* login(action) {
    
    try{

        const username = action.payload.username;
        const password = action.payload.password;
        const user = yield call(api.auth.login, [username, password]);

        yield put({type: 'app/loginOk', payload: user});
    } catch(err) {

        yield put({type: 'app/loginError'});
    }
}

function* checkToken(action) {

    try{

        const token = action.payload.token;
        const user = yield call(api.auth.checkToken, [token]);
        user.data.token = token;
        
        yield put({type: 'app/checkTokenOk', payload: user});
    }catch(err){
        yield put({type: 'app/checkTokenError'});
    }
    
}

function* register(action){
    try{
        const firstname = action.payload.firstname;
        const lastname = action.payload.lastname;
        const email = action.payload.email;
        const password = action.payload.password;       

        const result = yield call(api.auth.register, [firstname, lastname, email, password]);

        yield put({type:'app/registerOk'});

    } catch(err){
        yield put({type: 'app/registerErr'});
    }
}

function* getMovies(action){
    try{

        let movies;
        if(action.payload && action.payload.token) {
            movies = yield call(api.movie.getMovies, [action.payload.token, action.payload.sortBy, action.payload.author]);
        } else {
            movies = yield call(api.movie.getMovies, [undefined, action.payload.sortBy, action.payload.author]);
        }
        movies = movies.data.movies;
        yield put({type: 'app/getMoviesOk', payload: movies });
    } catch(err){
        yield put({type: 'app/getMoviesErr'});
    }
}

function* createMovie(action){
    try{
        const title = action.payload.title;
        const description = action.payload.description;
        const token = action.payload.token;

        yield call(api.movie.createMovie, [title, description, token])
        let movies = yield call(api.movie.getMovies, [action.payload.token]);
        movies = movies.data.movies;

        yield put({type: 'app/createMovieOk', payload: movies });
    } catch(err){
        yield put({type: 'app/createMovieErr'});
    }
}

function* createMovieOpinion(action){
    try{
        const likes = action.payload.likes;
        const movieId = action.payload.movieId;
        const token = action.payload.token;
        const deleteCurrentOpinion = action.payload.clear;

        if(deleteCurrentOpinion)
            yield call(api.movie.deleteMovieOpinion, [movieId, token]);

        yield call(api.movie.createMovieOpinion, [likes, movieId, token])
        let movies = yield call(api.movie.getMovies, [action.payload.token]);
        movies = movies.data.movies;

        yield put({type: 'app/createMovieOpinionOk', payload: movies });
    } catch(err){
        yield put({type: 'app/createMovieOpinionErr'});
    }
}

function* deleteMovieOpinion(action){
    try{
        const movieId = action.payload.movieId;
        const token = action.payload.token;

        yield call(api.movie.deleteMovieOpinion, [movieId, token])
        let movies = yield call(api.movie.getMovies, [action.payload.token]);
        movies = movies.data.movies;

        yield put({type: 'app/deleteMovieOpinionOk', payload: movies });
    } catch(err){
        yield put({type: 'app/deleteMovieOpinionErr'});
    }
}

export function* watchLogin() {
    yield takeLatest("app/requestLogin", login)
}

export function* watchCheckToken() {
    yield takeLatest("app/checkToken", checkToken)
}

export function* watchGetMovies() {
    yield takeLatest("app/getMovies", getMovies)
}

export function* watchCreateMovie() {
    yield takeLatest("app/createMovie", createMovie)
}

export function* watchCreateMovieOpinion() {
    yield takeLatest("app/createMovieOpinion", createMovieOpinion)
}

export function* watchDeleteMovieOpinion() {
    yield takeLatest("app/deleteMovieOpinion", deleteMovieOpinion)
}

export function* watchRegister() {
    yield takeLatest("app/register", register);
}