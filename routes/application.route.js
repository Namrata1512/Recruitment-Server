const express = require('express');
const applicationController = require('../controllers/application.controller');
const router = express.Router();

router.post('/', applicationController.create);
router.get('/:id', applicationController.getById);
router.put('/:id', applicationController.update);
router.delete('/:id', applicationController.delete);

module.exports = router;
