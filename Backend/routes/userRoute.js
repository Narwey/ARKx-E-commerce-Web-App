const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');

router.post('/login', userController.login);
router.post('/', authenticated , checkRole(['admin']), userController.AddUser);
router.get('/', userController.getUsers);
router.get('/:id' ,authenticated , checkRole(['admin','manager']) , userController.getUserById);
router.get('/', userController.searchUsers);
router.put('/:id' , userController.updateUser);
router.delete('/:id', authenticated , checkRole(['admin']) , userController.deleteUser);



module.exports = router ;