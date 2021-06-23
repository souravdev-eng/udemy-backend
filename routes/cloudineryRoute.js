const express = require('express');
const { upload, remove } = require('../controllers/cloudineryController');

const router = express.Router();

router.post('/image-uplods', upload);
router.post('/remove-image', remove);

module.exports = router;
