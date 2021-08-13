var express = require('express');
var router = express.Router();
const db = require('../models');
const controller = require('../controllers/controller.js');

/* GET home page. */
router.get('/', controller.index);
router.post('/', controller.staffPost);

router.get('/punches', controller.punchesGet);
router.post('/punches', controller.punchesPost);

module.exports = router;
