import Api from '../../services/api'
const ActionsDashboard = (router) => {
    
    function getAll () {
        return new Promise((resolve, reject) => {
            Api.get()
                .then(function(r){
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function getById (id) {
        return new Promise((resolve, reject) => {
            Api.get()
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function create (Object) {
        return new Promise((resolve, reject) => {
            Api.post()
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function edit () {

    }

    function remove () {

    }
    
    function returnThen (r) {
        console.log('r', r)
    }
    
    function returnCatch (reject, error) {
        reject(error)
    }

    return {getAll, getById, create, edit, remove}
}

export default ActionsDashboard()
