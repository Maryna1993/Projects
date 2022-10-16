const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/image/:id', (req, res) => {
    const images = getImagesFromDB(),
        image = images.find(image => image.id === req.params.id);

    image ? res.send(image) : res.status(404).send({error: 'Task with given ID was not found'});
});

function getImagesFromDB() {
    return JSON.parse(fs.readFileSync(config.get('database.images'), 'utf8'));
}


module.exports = router;