import Api from '../../services/api'
import { toast } from 'react-toastify'

const ActionsUserRegistration = (router) => {
    function getUsers () {
        return new Promise((resolve, reject) => {

            Api.get(`/${router}`)
                .then(function(r){
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function getUserById (id) {
        return new Promise((resolve, reject) => {
            Api.get(`/${router}/${id}`)
                .then(function(r) {
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error.response)
                })
        })
    }


    function createUser (User) {
        return new Promise((resolve, reject) => {
            Api.post(`/${'create_users'}`, User)
                .then((r) => {
                    const {mensagem} = r.data
                    toast.success(mensagem)
                    resolve(r)
                })
                .catch((e) => {
                    const error = e.response.data.error
                    toast.error(error)
                    reject(e)
                })
        })
    }

    async function editUser (user) {
        let res = await Api.put(`/${'update_user'}`, user);
        let { message } = res.data;
        toast.success(message);
    }

    function deleteUser () {

    }
    
    return {getUsers, getUserById, createUser, editUser, deleteUser}
}

export default ActionsUserRegistration('users')