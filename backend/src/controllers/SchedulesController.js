const connection = require('../database/connection');
const logger = require('../logger/logger');

module.exports = {

    async getAll(req, res){
        const { user_id, date } =  req.query
        
        const tennisCourts = await connection('schedules').select('*')
            .where((qb) => {

                if (user_id)
                    qb.andWhere({user_id: user_id})
                
                if (date)
                    qb.andWhere('date','like',`%${date}%`)
            })
            .orderBy('date', 'ASC')
            .orderBy('time', 'ASC')


        return res.json(tennisCourts);
    },

    async create(req, res) {
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
            .andWhere('time', 'in', time)
            .andWhere('tennis_court_id', '=', tennis_court_id);

        if(schedule.length > 0) {
            return res.status(400).send({
                error: 'Scheduling already carried out for this date, time and tennis court'
            })
        }
        
        const trx = await connection.transaction();
        const schedulesOfIds = []
        for(t in time) {
            const schedule = await trx('schedules').insert({
                date,
                time: time[t],
                user_id,
                tennis_court_id
            });

            schedulesOfIds.push(schedule[0])
        }
        
        trx.commit()
        logger.info("Schedule successfully created");
        return res.json({ schedules_ids: schedulesOfIds, success: 'Tennis court successfully created' });
    },

    async deleteSchedules (req, res) {
        const { user, reservation_id } = req.query
        
        const deleteReservation = await connection('schedules')
            .where({id: reservation_id, user_id: user}).del();
        
        if(deleteReservation == 0) {
            return res.status(400).send({ error: 'Reservation not found' });
        }
  
        logger.info("Schedule successfully delete");
        return res.status(200).send({ success: 'Tennis court successfully delete' });
    }
};