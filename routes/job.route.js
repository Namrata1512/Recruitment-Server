const express = require('express');
const jobController = require('../controllers/job.controller');
const router = express.Router();

router.post('/', jobController.create);
router.get('/:id', jobController.getById);
router.put('/:id', jobController.update);
router.delete('/:id', jobController.delete);

module.exports = router;
