const express = require('express')
const {register,login,addFriend} = require('../controllers/users')
const auth = require('../middleware/auth')
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/addFriend/:username').post(auth,addFriend);
module.exports = router