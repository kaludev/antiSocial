const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        fs.mkdirSync('images/'+req.user.userId, { recursive: true })
        cb(null, 'images/'+req.user.userId);
    },
    filename: function(req, file, cb) {   
        cb(null, 'profile.png');
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

module.exports = upload.single('photo')