const express = require('express');

const dvdController = require('../controller/dvd');

const router = express.Router();


router.get('/', dvdController.retrieveAllDvd);

router.get('/:id', dvdController.retrieveIdDvd);

router.post('/', dvdController.createDvd);

router.put('/:id', dvdController.updateDvd);

router.delete('/:id', dvdController.deleteDvd);

router.delete('/', dvdController.deleteAllDvd);

module.exports = router