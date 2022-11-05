const express = require('express')
const register = require('../controllers/users')

const router = express.Router();

router.route('/register').post(register);

module.exports = router