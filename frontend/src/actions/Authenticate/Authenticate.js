
import Api from '../../services/api'
import { toast } from 'react-toastify'

const ActionsAuthenticate = (router) => {
    
    function authenticate (User) {
        return new Promise((resolve, reject) => {

            Api.post(`/authenticate`, User)
                .then(function(r){
                    const { mensagem } = r.data
                    toast('Seja bem vindo !')
                    toast.success(mensagem)

                    resolve(r.data)
                })
                .catch(function (e) {
                    const { error } = e.response.data
                    
                    toast.error(error)
                    reject(e)
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