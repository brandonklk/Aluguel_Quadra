const connection = require('../database/connection');
const logger = require('../logger/logger');

module.exports = {

    async getAll(req, res){
        const tennisCourts = await connection('tennis_courts').select('*');

        return res.json(tennisCourts);
    },

    async getPerId(req, res){
        const { id } = req.params;

        const tennisCourt = await connection('tennis_courts').select('*').where('id', '=', id);

        if(!tennisCourt || tennisCourt.length == 0) {
            return res.status(400).send({ error: 'Tennis court not found' })
        }

        return res.json(tennisCourt);
    },

    async getPerName(req, res){
        const { name } = req.params;

        const tennisCourt = await connection('tennis_courts').select('*').where('name', 'like', name);

        if(!tennisCourt || tennisCourt.length == 0) {
            return res.status(400).send({ error: 'Tennis court not found' })
        }

        return res.json(tennisCourt);
    },

    async create(req, res){
        const { name, value ,owner_id, horario_inicio, horario_final } = req.body;
        let idTennisCourts;

        const owner = await connection('users').select('id').where('id', '=', owner_id);

        if(!owner || owner.length == 0) {
            return res.status(400).send({ error: 'User not found' })
        }

        await connection('tennis_courts').insert({
            name,
            value,
            owner_id,
            horario_inicio,
            horario_final
        }).returning('id').then(([id]) => idTennisCourts = id);

        logger.info("Tennis court successfully created");
        return res.json({ id: idTennisCourts, mensagem: 'Quadra de tênis criada com sucesso !' });
    },

    async update(req, res){
        const { id, name, value , owner_id, horario_inicio, horario_final} = req.body;

        tennisCourt = await connection('tennis_courts').update({name, value, owner_id, horario_inicio, horario_final}).where('id', '=', id);  
        
        if(tennisCourt == 0){
          return res.status(400).send({ error: 'Tennis court not found' });
        }
  
        logger.info("Tennis court successfully changed");
        return res.status(200).send({ mensagem: 'Tennis court successfully changed' });
    },

    async deletePerId(req, res){
        const { id } = req.params;

        const tennisCourt = await connection('tennis_courts').where('id', '=', id).del();

        if(!tennisCourt || tennisCourt.length == 0) {
            return res.status(400).send({ error: 'Tennis court not found' })
        }

        logger.info("Tennis court successfully deleted");
        return res.status(200).send({ mensagem: 'Quadra de tênis apagada com sucesso !' });
    },

    async deletePerName(req, res){
        const { name } = req.params;

        const tennisCourt = await connection('tennis_courts').where('name', 'like', name).del();

        if(!tennisCourt || tennisCourt.length == 0) {
            return res.status(400).send({ error: 'Tennis court not found' })
        }

        logger.info("Tennis court successfully deleted");
        return res.status(200).send({ success: 'Tennis court(s) successfully deleted' });
    }

};