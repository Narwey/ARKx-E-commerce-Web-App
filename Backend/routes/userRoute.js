const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');

router.post('/login', userController.login);
router.post('/',authenticated, userController.AddUser);
router.get('/',authenticated, userController.getUsers);
router.get('/:id' ,authenticated, userController.getUserById);
router.get('/',authenticated ,  userController.searchUsers);
router.put('/:id' , authenticated, checkRole, userController.updateUser);
router.delete('/:id', authenticated , checkRole,userController.deleteUser);



module.exports = router;