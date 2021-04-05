// Initialize express router
let router = require('express').Router();
let uploadmulter = require('../multer_config.js');

var common_controller = require('../controllers/common_controller.js');
router.route('/api/excelReader').post(uploadmulter,common_controller.excelReader);

module.exports = router;
