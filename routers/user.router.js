const router = require('express').Router();

const controller = require('../controllers/user.controller');
const userMW = require('../middlewares/user.middleware');
const validator = require('../validators/user.validator');

router.get('/', controller.getUsers);
router.post('/', userMW.isUserBodyValid(validator.userValidator), controller.createUser);

router.get('/:userId', userMW.isUserById, controller.getUserById);
router.put('/:userId', userMW.isUserById, userMW.isUserBodyValid(validator.userValidator), controller.updateUser);
router.delete('/:userId', userMW.isUserById, controller.deleteUser);

module.exports = router;
