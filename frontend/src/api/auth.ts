import http from './axios';

export const login = async (args: Array<any>) => {
        
        return await http.post('/api/auth', {
                username: args[0],
                password: args[1]
        });
};

export const checkToken = async (args: Array<any>) => {
        
        return await http.get('/api/auth/user', {
                headers: {
                        "Authorization": `Bearer ${args[0]}`
                }
        });
};

export const register = async (args: Array<any>) => {

        return await http.post('/api/user', {
                firstname: args[0],
                lastname: args[1],
                email: args[2],
                password: args[3]
        });
};