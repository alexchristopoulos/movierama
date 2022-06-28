import http from './axios';

export const createMovie = async (args: Array<any>) => {

    return await http.post('/api/movie', {
            title: args[0],
            description: args[1]
    }, {
        headers: {
            "Authorization": `Bearer ${args[2]}`
        }
    });
};

export const getMovies = async (args?) => {

    let query = '';

    if(args[1] && args[2]) 
        query = '?sortBy=' + args[1] + '&author=' + args[2];
    else if(args[1])
        query = '?sortBy=' + args[1];
    else if(args[2])
        query = '?author=' + args[2];


    return args && args[0]? 
        await http.get('/api/movie' + query, {
                headers: {
                    "Authorization": `Bearer ${args[0]}`
                }
        }):
        await http.get('/api/movie' + query);
};

export const createMovieOpinion = async (args: Array<any>) => {

    return await http.post('/api/movie/opinion', {
            likes: args[0],
            movieId: args[1]
    }, {
        headers: {
            "Authorization": `Bearer ${args[2]}`
        }
    });
};

export const deleteMovieOpinion = async (args: Array<any>) => {
    return await http.delete('/api/movie/opinion', {
        headers: {
            "Authorization": `Bearer ${args[1]}`
        },
        data: {
            movieId: args[0]
        }
    });
};