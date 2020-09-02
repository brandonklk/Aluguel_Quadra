const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/users',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().trim(),
        email: Joi.string().required().email().trim(),
        phone: Joi.string().required().min(11).max(15).trim(),
    })
}), UserController.create);

module.exports = router;