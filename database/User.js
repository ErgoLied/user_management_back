const {Schema, model} = require('mongoose');

const {USER_ROLES} = require('../configs');
const passService = require('../services/password.service');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    user_type: {
        type: String,
        default: USER_ROLES.DRIVER,
        enum: Object.values(USER_ROLES)
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createUserWithHashedPass(user){
        const hashPass = await passService.hash(user.password);

        return this.create({...user, password: hashPass});
    }
};

module.exports = model('user', userSchema);
