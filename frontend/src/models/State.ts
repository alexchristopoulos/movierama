export interface StateModel { 
    status: Number,
    user: {
        firstname: String,
        lastname: String,
        email: String,
        token: any
    },
    movies: Array<any>,
    redirect: {
        go: false,
        path: ''
    }
};

//status 0 not checked token
//status 1 no token guest user
//status 2 logged in user

export const State: StateModel = {
    status: 0,
    user: {
        firstname: '',
        lastname: '',
        email: '',
        token: undefined
    },
    movies: [],
    redirect: {
        go: false,
        path: ''
    }
};