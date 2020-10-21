const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Schedules', () => {
    beforeEach(async () => {
       await connection.migrate.rollback();
       await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('you should get all the available times', async () => {
        const response = await request(app)
        .get('/schedules')
        .expect(200)
    });

    it('create new schedules', async () => {
        const response = await request(app)
        .post('/create_schedules')
        .send({
            date: '20/10/2020',
            time: ['10:00', '11:00'],
            user_id: 1,
            tennis_court_id: 1
        })
        .expect(200)

        console.log("1",response.body)
        console.log("2", response.body.schedulesOfIds)
    });
});