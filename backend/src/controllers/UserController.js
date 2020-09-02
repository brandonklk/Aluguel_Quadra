const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {

    async getAllUsers(req, res){
        const users = await connection('users').select('*');

        return res.json(users);
    },

    async create(req, res){
        const { name, email, password, phone } = req.body;

        const id = generateUniqueId();

        await connection('users').insert({
            id,
            name,
            email,
            password,
            phone,
        })

        return res.json({ id });
    }
};