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

    function getUserById () {

    }

    function createUser (User) {
        return new Promise((resolve, reject) => {
            Api.post(`/${router}`, User)
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function editUser () {

    }

    function deleteUser () {

    }
    
    function returnThen (r) {
        console.log('r', r)
    }
    
    function returnCatch (reject, error) {
        reject(error)
    }

    return {getUsers, getUserById, createUser, editUser, deleteUser,}
}

export default ActionsUserRegistration('users')