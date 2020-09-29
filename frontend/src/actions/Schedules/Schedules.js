import Api from '../../services/api'
import { getUser } from '../../services/auth'
  
const ActionsSchedules = (router) => {
    
    function getAll (param = {user_id: null}) {
        const user = JSON.parse(getUser())
        param.user_id = user.id
        return new Promise((resolve, reject) => {
            Api.get(`/schedules`, {params: param})
                .then(function(r){
                    let schedules = r.data
                    resolve(schedules)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    // function getFilter (param) {
    //     cons
    //     let filter = param.map()
    //     return new Promise((resolve, reject) => {
    //         Api.get(`/schedules/?id=${param.id}`)
    //             .then(function(r){
    //                 resolve(r.data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // }

    function getById (id) {
        // return new Promise((resolve, reject) => {
        //     Api.get(`/tennis_courts/id/${id}`)
        //         .then(function(r){
        //             resolve(r.data[0])
        //         })
        //         .catch(function (error) {
        //             reject(error)
        //         })
        // })
    }

    function getByName (name) {
        // return new Promise((resolve, reject) => {
        //     Api.get(`/tennis_courts/name/${name}`)
        //         .then(function(r){
        //             resolve(r.data)
        //         })
        //         .catch(function (error) {
        //             reject(error)
        //         })
        // })
    }

    // function getByUser (param) {
    //     return new Promise((resolve, reject) => {
    //         Api.get(`/tennis_courts/name/${name}`)
    //             .then(function(r){
    //                 resolve(r.data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // }
    
    function create (objeto) {
        const user = JSON.parse(getUser())
       
        return new Promise((resolve, reject) => {
            objeto.user_id = user.id

            Api.post('/create_schedules', objeto)
                .then(function(r) {
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
    
    function edit (Object) {
        // return new Promise((resolve, reject) => {
        //     Api.put('/update_tennis_courts', Object)
        //         .then(function(r){
        //             resolve(r)
        //         })
        //         .catch(function (error) {
        //             reject(error)
        //         })
        // })
    }

    function remove (Object) {
        const user = JSON.parse(getUser())
        Object.user = user.id
        return new Promise((resolve, reject) => {
            Api.delete(`/delete_schedule`, {params: Object})
                .then(function(r){
                    console.log('r', r)
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    return {getAll, getById, getByName, create, edit, remove}
}

export default ActionsSchedules('')
