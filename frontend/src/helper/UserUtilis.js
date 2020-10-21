import { getUser, getToken } from '../services/auth.js';

    const getIdOfUser = () => {
        return getToken();
    }

    const getDataOfUser = () => {
        return getUser();
    }

    export {
        getIdOfUser,
        getDataOfUser
    }