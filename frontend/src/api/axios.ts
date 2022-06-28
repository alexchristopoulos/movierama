import axios from 'axios';
import config from '../config/config';

const ENV = 'dev';

let api = axios.create({
    baseURL: config.api.proto + '://' + config.api.host + ':' + config.api.port,
    headers: {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Accept': 'Token',
    }
});

export default api;