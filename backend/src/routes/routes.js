const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/create_users',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().trim(),
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().min(6).max(12),
        phone: Joi.string().required().min(11).max(15).trim(),
    })
}), UserController.create);

router.post('/request_password_user',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim(),
    })
}), UserController.requestResetPassword);

router.post('/authenticate',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim(),
    })
}), UserController.authenticate);

router.post('/request_forgot_password',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim()
    })
}), UserController.requestForgotPassword);

router.put('/reset_password_user',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim(),
        token: Joi.string().required().token().trim(),
        password: Joi.string().required()
    })
}), UserController.resetPassword);

module.exports = router;