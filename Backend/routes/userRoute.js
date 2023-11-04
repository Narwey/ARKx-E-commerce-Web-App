const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');

router.post('/login', userController.login);
router.post('/', authenticated , checkRole(['admin']), userController.AddUser);
// router.get('/', authenticated, checkRole(['admin','manager']), userController.getUsers);
router.get('/:id' ,authenticated , checkRole(['admin','manager']) , userController.getUserById);
router.get('/', authenticated , checkRole(['admin','manager']) ,  userController.searchUsers);
router.put('/:id' , authenticated , checkRole(['admin']) , userController.updateUser);
router.delete('/:id', authenticated , checkRole(['admin']) , userController.deleteUser);



module.exports = router ;