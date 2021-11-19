const User = require('../database/User');
const ErrorHandler = require('../error_handler/ErrorHandler');
const {ERR_MSG, STATUS_CODE} = require('../configs');

module.exports = {
    isUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.findOne({_id: userId}).lean();

            if(!user){
                throw new ErrorHandler(ERR_MSG.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND_404);
            }

            req.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if(error){
                throw new ErrorHandler(error.details[0].message, STATUS_CODE.BAD_REQUEST_400);
            }

            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
};
