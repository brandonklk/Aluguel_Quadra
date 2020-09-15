import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 30000,
})

export default Api;