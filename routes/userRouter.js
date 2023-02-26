const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/getAllUsers", userController.getAllUsers)
router.get("/getOneUser/:id", userController.getOneUser)
router.post("/createUser", userController.createUser)
router.patch("/updateUser/:id", userController.updateUser)
router.delete("/deleteUser/:id", userController.deleteUser)

module.exports = router;
