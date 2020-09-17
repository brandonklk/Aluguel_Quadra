
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

    function requestForgotPassword (params) {
        return new Promise((resolve, reject) => {
            Api.post('/request_forgot_password', params)
                .then((r) => {
                    resolve(r.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    
    function resetPasswordUser (params) {
        return new Promise((resolve, reject) => {
            Api.put('/reset_password_user', params)
                .then((r) => {
                    resolve(r.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    return {authenticate, requestForgotPassword, resetPasswordUser}
}

export default ActionsAuthenticate('')