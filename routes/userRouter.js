const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const fileMiddleware = require('../multerStorage');

router.get("/all", userController.getAllUsers)
router.get("/one/:id", userController.getOneUser)
router.post("/create", fileMiddleware.single('img'),userController.createUser)
router.put("/update/:id", fileMiddleware.single('img'),userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)

module.exports = router;
