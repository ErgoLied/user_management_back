const User = require('../database/User');
const {STATUS_CODE} = require('../configs');
const userUtil = require('../util/user.util');
const passService = require('../services/password.service');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find().lean();

            users.forEach(user => userUtil.userNormalize(user));

            res.json(users);
        }
        catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {user} = req;

            const normUser = userUtil.userNormalize(user);
            res.json(normUser);
        }
        catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await User.createUserWithHashedPass(req.body);

            const normUser = userUtil.userNormalize(user.toObject());

            res.status(STATUS_CODE.CREATED_201).json(normUser);
        }
        catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const hashPass = await passService.hash(req.body.password);

            const user = await User.findOneAndUpdate(userId, {
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashPass,
                user_type: req.body.user_type
            }, {new: true});

            const normUser = userUtil.userNormalize(user.toObject());

            res.status(STATUS_CODE.CREATED_201).json(normUser);
        }
        catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await User.findOneAndDelete({_id: userId});

            res.sendStatus(STATUS_CODE.NO_CONTENT_204);
        }
        catch (e) {
            next(e);
        }
    }
};
