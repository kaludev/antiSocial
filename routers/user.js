const express = require('express')
const {register,login,addFriend,acceptFriend} = require('../controllers/users')
const auth = require('../middleware/auth')
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/addfriend/:username').get(auth,addFriend);
router.route('/acceptfriend/:username').get(auth,acceptFriend);
module.exports = router