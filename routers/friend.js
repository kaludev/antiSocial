const express = require('express')
const {addFriend,acceptFriend,deleteFriend,getFriends,getRequests,getFriend, getFriendByUsername} = require('../controllers/friends');
const auth= require('../middleware/auth');
const router = express.Router();

router.route('/addfriend/:username').get(auth,addFriend);
router.route('/acceptfriend/:username').get(auth,acceptFriend);
router.route('/deletefriend/:username').get(auth,deleteFriend);
router.route('/getfriends').get(auth,getFriends);
router.route('/getrequests').get(auth,getRequests);
router.route('/getfriend/:id').get(auth,getFriend);
router.route('/getfriendbyusername/:username').get(auth,getFriendByUsername);

module.exports = router