const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('../controllers/UserController');
const TennisCourtsController = require('../controllers/TennisCourtsController');
const SchedulesController = require('../controllers/SchedulesController');

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), UserController.getUserById);

router.post('/create_users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().trim(),
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().min(6).max(12),
        phone: Joi.string().required().min(11).max(15).trim(),
        image_base_64: Joi.string()
    })
}), UserController.create);

router.post('/authenticate', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim(),
    })
}), UserController.authenticate);

router.post('/request_forgot_password', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim()
    })
}), UserController.requestForgotPassword);

router.put('/reset_password_user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim(),
        token: Joi.string().required().token().trim(),
        password: Joi.string().required()
    })
}), UserController.resetPassword);

router.put('/update_user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().min(6).max(12),
        phone: Joi.string().required().min(11).max(15).trim(),
        image_base_64: Joi.string()
    })
}), UserController.updateDataUser);

router.get('/tennis_courts', TennisCourtsController.getAll);

router.get('/tennis_courts/id/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), TennisCourtsController.getPerId);

router.get('/tennis_courts/name/:name', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        name: Joi.string().required()
    })
}), TennisCourtsController.getPerName);

router.post('/create_tennis_courts', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().trim(),
        owner_id: Joi.number().required(),
        value: Joi.number().required(),
        horario_inicio: Joi.string().required(),
        horario_final: Joi.string().required()
    })
}), TennisCourtsController.create);

router.put('/update_tennis_courts', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required().trim(),
        value: Joi.number().required(),
        owner_id: Joi.number().required(),
        horario_inicio: Joi.string().required(),
        horario_final: Joi.string().required()
    })
}), TennisCourtsController.update);

router.get('/delete_tennis_courts/id/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), TennisCourtsController.deletePerId);

router.get('/delete_tennis_courts/name/:name', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        name: Joi.string().required()
    })
}), TennisCourtsController.deletePerName);

router.post('/create_schedules', celebrate({
    [Segments.BODY]: Joi.object().keys({
        date: Joi.string().required().trim(),
        time: Joi.array().required(),
        user_id: Joi.number().required(),
        tennis_court_id: Joi.number().required()
    })
}), SchedulesController.create);

router.delete('/delete_schedule', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        user: Joi.number().required(),
        reservation_id: Joi.number().required()
    })
}), SchedulesController.deleteSchedules);

router.get('/schedules', SchedulesController.getAll);

module.exports = router;