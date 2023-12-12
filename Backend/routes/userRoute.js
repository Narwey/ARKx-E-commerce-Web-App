const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');
const multer = require("multer");
const upload = multer();

router.post('/login', userController.login);
router.post('/', upload.none() , userController.AddUser);
router.get('/', userController.getUsers);
router.get('/:id' , userController.getUserById);
router.get('/', userController.searchUsers);
router.put('/:id' , userController.updateUser);
router.delete('/:id', userController.deleteUser);



module.exports = router ;