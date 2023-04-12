const express = require('express');

//CONTROLLERS
const { signup, findAll, signin } = require('../controllers/user.controller');

//MIDDLEWARE
const { validAccount } = require('../middlewares/validAccount.middleware');
const {
    validExistsUser,
    validLoginUser,
} = require('../middlewares/validExistUser.middleware');

const router = express.Router();

router.get('/', findAll);

router.post('/signup', validExistsUser, validAccount, signup);

router.get('/signin', validLoginUser, signin);

module.exports = router;
