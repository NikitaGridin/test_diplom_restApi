const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/all", userController.getAllUsers)
router.get("/one/:id", userController.getOneUser)
router.post("/create", userController.createUser)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)

module.exports = router;
