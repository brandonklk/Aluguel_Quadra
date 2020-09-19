const connection = require('../database/connection');
const logger = require('../logger/logger');

module.exports = {

    async getAll(req, res){
        const tennisCourts = await connection('schedules').select('*');

        return res.json(tennisCourts);
    },

    async create(req, res){
        const { date, time, user_id, tennis_court_id } = req.body;

        const user = await connection('users').select('id').where('id', '=', user_id);
        const tennisCourt = await connection('tennis_courts').select('id').where('id', '=', tennis_court_id);

        if(!user || user.length == 0) {
            return res.status(400).send({ error: 'User not found' })
        }

        if(!tennisCourt || tennisCourt.length == 0) {
            return res.status(400).send({ error: 'Tennis court not found' })
        }

        const schedule = await connection('schedules').select('id')
            .where('date', 'like', date)
            .andWhere('time', 'like', time)
            .andWhere('tennis_court_id', '=', tennis_court_id);

        if(schedule.length > 0) {
            return res.status(400).send({
                error: 'Scheduling already carried out for this date, time and tennis court'
            })
        }

        await connection('schedules').insert({
            date,
            time,
            user_id,
            tennis_court_id
        });

        logger.info("Schedule successfully created");
        return res.json({ success: 'Tennis court successfully deleted' });
    }
};