import { createSlice } from '@reduxjs/toolkit';
import { State, StateModel } from '../models/State';

const initialState = State;

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        checkToken: (state: StateModel, action) => {
            //watched by saga
        },
        checkTokenOk: (state: StateModel, action) => {

            Object.assign(state, {
                status: 1,
                user: {
                    firstname: action.payload.data.firstname,
                    lastname: action.payload.data.lastname,
                    email: action.payload.data.email,
                    token: action.payload.data.token
                }
            });
        },
        checkTokenError: (state: StateModel, action) => {
            Object.assign(state, { status: 0 });

        },
        setGuestStatus: (state: StateModel, action) => {
            Object.assign(state, { status: 0 });
        },
        requestLogin: (state: StateModel, action) => {
            //watched by saga
        },
        loginOk: (state: StateModel, action) => {

            Object.assign(state, {
                status: 2,
                user: {
                    firstname: action.payload.data.firstname,
                    lastname: action.payload.data.lastname,
                    email: action.payload.data.email,
                    token: action.payload.data.token
                },
                redirect: {
                    go: true,
                    path: '/'
                }
            });

            localStorage.setItem('token', action.payload.data.token);
        },
        loginError: (state: StateModel, action) => {
            Object.assign(state, {
                status: 1,
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    token: undefined
                }
            });

            alert('Invalid credentials. Failed to login!');
        },
        logout: (state: StateModel, action) => {

            localStorage.removeItem('token');

            Object.assign(state, {
                status: 0,
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    token: undefined
                },
                 redirect: {
                    go: true, path: ''
                }
            });
        },
        getMovies: (state: StateModel, action) => {
            //watched by saga
        },
        getMoviesOk: (state: StateModel, action) => {
            Object.assign(state, { movies: action.payload });
        },
        getMoviesErr: (state: StateModel, action) => {
            alert('Failed to fetch the movies. Server error');
            //Object.assign(state, { movies: [] });
        },
        createMovie: (state: StateModel, action) => {
            //watched by saga
        },
        createMovieOk: (state: StateModel, action) => {
            Object.assign(state, { movies: action.payload });
        },
        createMovieErr: (state: StateModel, action) => {
            Object.assign(state, { movies: [] });
            alert('Failed to create the movie. Server error');
        },
        createMovieOpinion: (state: StateModel, action) => {
            //watched by saga
        },
        createMovieOpinionOk: (state: StateModel, action) => {
            Object.assign(state, { movies: action.payload });
        },
        createMovieOpinionErr: (state: StateModel, action) => {
            Object.assign(state, { movies: [] });
            alert('Failed to create the like/hate. like/hate already poster or owner of this movie');
        },
        deleteMovieOpinion: (state: StateModel, action) => {
            //watched by saga
        },
        deleteMovieOpinionOk: (state: StateModel, action) => {
            Object.assign(state, { movies: action.payload });
        },
        deleteMovieOpinionErr: (state: StateModel, action) => {
            alert('Failed to delete like/hate');
            Object.assign(state, { movies: [] });
        },
        register: (state: StateModel, action) => {
            //watched by saga
        },
        registerOk: (state: StateModel, action) => {

            alert('You are registered. You may now login');

            Object.assign(state, {
                redirect: {
                    go: true,
                    path: '/login'
                }
            });            
        },
        registerErr: (state: StateModel, action) => {
            alert('Failed to register. Email provided registered or Invalid data provided');
        },
        redirect: (state: StateModel, action) => {
            Object.assign(state, { redirect: { go: false, path: ''} });
        }
    }
});

export const {

    checkToken,
    checkTokenOk,
    checkTokenError,
    requestLogin,
    loginOk, loginError,
    register,
    registerErr,
    registerOk, 
    getMovies, 
    getMoviesErr, 
    getMoviesOk,
    createMovie,
    createMovieOk,
    createMovieErr,
    createMovieOpinion,
    createMovieOpinionErr,
    createMovieOpinionOk

} = appSlice.actions;

export default appSlice;