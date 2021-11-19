const Joi = require('joi');

const {REG_EX, USER_ROLES} = require('../configs');

const userValidator = Joi.object({
    username: Joi
        .string()
        .min(2)
        .max(20)
        .trim()
        .required(),
    first_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    last_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(REG_EX.EMAIL_REGEXP)
        .trim()
        .required(),
    user_type: Joi
        .string()
        .allow(...Object.values(USER_ROLES)),
    password: Joi
        .string()
        .regex(REG_EX.PASSWORD_REGEXP)
        .trim()
        .required()
});

module.exports = {userValidator};
