const express = require('express')
const {register,login,sendMessage} = require('../controllers/users')
const auth = require('../middleware/auth')
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/sendMessage').post(auth,sendMessage)
module.exports = router