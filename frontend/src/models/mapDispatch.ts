export default (dispatch) => {
    return {
        login: (username, password) => dispatch({ type: 'app/requestLogin', payload: { username: username, password: password } }),
        isAuthenticated: (token) => dispatch({ type: 'app/checkToken', payload: { token: token } }),
        setGuestStatus: () => dispatch({ type: 'app/setGuestStatus' }),
        logout: () => dispatch({ type: 'app/logout' }),

        getMovies: (token?) => token?dispatch({ type: 'app/getMovies', payload: { token: token } }): dispatch({ type: 'app/getMovies', payload: {} }),
        getMoviesByAuthor: (author, token?) => token?dispatch({ type: 'app/getMovies', payload: { token: token, author: author } }): dispatch({ type: 'app/getMovies', payload: { author: author } }),
        getMoviesSorted: (sortBy, token?) => token?dispatch({ type: 'app/getMovies', payload: { token: token, sortBy: sortBy } }): dispatch({ type: 'app/getMovies', payload: { sortBy: sortBy } }),

        createMovie: (title, description, token) => dispatch({ type: 'app/createMovie', payload: { title: title, description: description, token: token } }),
        createMovieOpinion: (likes, movieId, token, clear?) => clear?dispatch({ type: 'app/createMovieOpinion', payload: { likes: likes, movieId: movieId, token: token, clear: true } }):dispatch({ type: 'app/createMovieOpinion', payload: { likes: likes, movieId: movieId, token: token } }),
        deleteMovieOpinion: (movieId, token) => dispatch({ type: 'app/deleteMovieOpinion', payload: { movieId: movieId, token: token } }),
        
        register: (firstname, lastname, email, password) => dispatch({ type: 'app/register', payload: { firstname: firstname, lastname: lastname, email: email, password: password } }),
        redirectFunc: () => dispatch({type: 'app/redirect'})
    }
};