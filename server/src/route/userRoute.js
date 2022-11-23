const router = require('express').Router();
const userController = require('../controller/userController');
const middleWareController = require('../controller/middlewareController');

router.get('/allUsers', middleWareController.verifyToken, userController.getAllUsers);
router.post('/newUser', middleWareController.checkRole, userController.newUser);
router.delete('/:id', middleWareController.checkRole, userController.deleteUser)

module.exports = router;