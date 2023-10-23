const express = require('express');
const roleController = require('../controllers/role.controller');
const router = express.Router();

router.post('/', roleController.create);
router.get('/:id', roleController.getById);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
