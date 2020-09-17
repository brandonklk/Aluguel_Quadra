
import Api from '../../services/api'

const ActionsAuthenticate = (router) => {
    
    function authenticate (User) {
        return new Promise((resolve, reject) => {

            Api.post(`/authenticate`, User)
                .then(function(r){
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error.response.data.error)
                })
        })
    }

    function requestPasswordUser (params) {
        return new Promise((resolve, reject) => {
            Api.post('/request_password_user', params)
                .then((r) => {
                    resolve(r)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    return {authenticate, requestPasswordUser}
}

export default ActionsAuthenticate('')