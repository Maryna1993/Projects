const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');


router.get('/api/images', (req, res) => res.send(fs.readFileSync(config.get('database.images'), 'utf8')));


module.exports = router;
