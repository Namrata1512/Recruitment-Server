const express = require('express');
const userController = require('../controllers/user.controller');
const { authJwt } = require("../middleware");
const router = express.Router();

router.post('/', userController.create);
router.get('/:id', userController.getById, authJwt.verifyToken);
router.put('/:id', userController.update, authJwt.verifyToken);
router.delete('/:id', userController.delete, authJwt.verifyToken);
router.get('/:id/applied-jobs', userController.getAppliedJobsForUser, authJwt.verifyToken);

module.exports = router;
