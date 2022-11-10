const express = require('express')
const {register,login,showMe,upload,addFriend,acceptFriend,deleteFriend,getFriends,search} = require('../controllers/users')
const auth = require('../middleware/auth');
const photoParser = require('../middleware/photoParser');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/showme').get(auth,showMe);
router.route('/upload').post(auth,photoParser,upload);
router.route('/addfriend/:username').get(auth,addFriend);
router.route('/acceptfriend/:username').get(auth,acceptFriend);
router.route('/deletefriend/:username').get(auth,deleteFriend);
router.route('/getfriends').get(auth,getFriends);
router.route('/search/:input').get(auth,search);

module.exports = router