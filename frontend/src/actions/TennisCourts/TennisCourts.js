import Api from '../../services/api'
import { getUser } from '../../services/auth'

const ActionsTennisCourts = (router) => {

    function getAll () {
        return new Promise((resolve, reject) => {
            Api.get('/tennis_courts')
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
            Api.get(`/tennis_courts/id/${id}`)
                .then(function(r){
                    resolve(r.data[0])
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function getByName (name) {
        return new Promise((resolve, reject) => {
            Api.get(`/tennis_courts/name/${name}`)
                .then(function(r){
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function create (object) {
        const user = JSON.parse(getUser())
        
        return new Promise((resolve, reject) => {
            object.owner_id = user.id
            Api.post('/create_tennis_courts', object)
                .then(function(r) {
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
    
    function edit (object) {
        const user = JSON.parse(getUser())
        return new Promise((resolve, reject) => {
            object.owner_id = user.id
            Api.put('/update_tennis_courts', object)
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function remove (id) {
        return new Promise((resolve, reject) => {
            Api.get(`/delete_tennis_courts/id/${id}`)
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    return {getAll, getById, getByName, create, edit, remove}
}

export default ActionsTennisCourts('')
