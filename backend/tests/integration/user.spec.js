const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('User', () => {
    beforeEach(async () => {
       await connection.migrate.rollback();
       await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('must be able to create a new user', async () => {
        const response = await request(app)
        .post('/create_users')
        .send({
            name: "Carlos jose",
            email: "segunda@gmail.com",
            password: "12345678",
            phone: "(47)91234-5678",
            image_base_64: "minha imagem"    
        });
        
        expect(response.body).toHaveProperty('email');
    });

    it('create a user without email invalid', async () => {
        const expectedResult = 'Error: &quot;email&quot; must be a valid email';

        const response = await request(app)
        .post('/create_users')
        .send({
            name: "Jose",
            email: "abc",
            password: "12345678",
            phone: "(47)91234-5678",
            image_base_64: "minha imagem"
        })
        .expect(500);

        expect(response.text.includes(expectedResult))
    });

    it('get user by id', async () => {
        const response = await request(app)
        .get('/users/')
        .query({ id: 1 })
        .expect(200);
    });

});