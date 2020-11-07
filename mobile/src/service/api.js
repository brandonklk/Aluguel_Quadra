import axios from 'axios';
const IP_RUN_BACKEND = process.env.IP_RUN_BACKEND

/**
 * O ip aonde esta sendo executado o Back-end,
 * lembrando que não pode ser colocado localhost 
 * pois a aplicação mobile esta sendo executada no celular
 */

const api = axios.create({
    baseURL: `http://${IP_RUN_BACKEND}:3333`
});

export default api;