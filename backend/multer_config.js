const multer = require('multer');r
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({
    storage: storage
});
var uploadmulter = upload.single('file');
module.exports = uploadmulter;