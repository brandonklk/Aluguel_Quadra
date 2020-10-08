import Api from '../../services/api'
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
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error.response.data.error)
                })
        })
    }

    function editUser () {

    }

    function deleteUser () {

    }
    
    return {getUsers, getUserById, createUser, editUser, deleteUser}
}

export default ActionsUserRegistration('users')