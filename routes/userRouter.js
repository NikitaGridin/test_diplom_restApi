const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const fileMiddleware = require('../middleware/multerStorage');

router.get("/all", userController.getAllUsers) //get all users
router.get("/one/:id", userController.getOneUser) //get one user by id
router.put("/update/:id", fileMiddleware.single('img'),userController.updateUser) //update user with profile image
router.delete("/delete/:id", userController.deleteUser) //delete user by id

module.exports = router;
