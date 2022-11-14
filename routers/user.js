const express = require('express')
const {register,login,showMe,logout,upload,profilePic,search, like, dislike} = require('../controllers/users')
const auth = require('../middleware/auth');
const photoParser = require('../middleware/photoParser');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/showme').get(auth,showMe);
router.route('/logout').post(auth,logout);
router.route('/upload').post(auth,photoParser,upload);
router.route('/like/:username').get(auth,like);
router.route('/dislike/:username').get(auth,dislike);
router.route('/profilePic').get(auth,profilePic)
router.route('/profilePic/:username').get(auth,profilePic)
router.route('/search/:input').get(auth,search);

module.exports = router