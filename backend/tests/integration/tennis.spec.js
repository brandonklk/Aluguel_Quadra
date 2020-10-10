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

    it('Create new tennis', async () => {
        const response = await request(app)
        .post('/create_tennis_courts')
        .send({
            name: "Quadra do carlos",
            owner_id: 1,
            value: 20
        })
        .expect(200)

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(1)
    });
});