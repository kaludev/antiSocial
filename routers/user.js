const express = require('express')
const {register,login,showMe,logout,upload,profilePic,addFriend,acceptFriend,deleteFriend,getFriends,getRequests,getFriend,search} = require('../controllers/users')
const auth = require('../middleware/auth');
const photoParser = require('../middleware/photoParser');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/showme').get(auth,showMe);
router.route('/logout').post(auth,logout);
router.route('/upload').post(auth,photoParser,upload);
router.route('/profilePic').get(auth,profilePic)
router.route('/profilePic/:username').get(auth,profilePic)
router.route('/addfriend/:username').get(auth,addFriend);
router.route('/acceptfriend/:username').get(auth,acceptFriend);
router.route('/deletefriend/:username').get(auth,deleteFriend);
router.route('/getfriends').get(auth,getFriends);
router.route('/getrequests').get(auth,getRequests);
router.route('/getfriend/:id').get(auth,getFriend);
router.route('/search/:input').get(auth,search);

module.exports = router