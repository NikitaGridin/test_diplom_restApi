const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const fileMiddleware = require('../middleware/multerStorage');

router.post("/sign-in", fileMiddleware.single('img'),authController.signIn) //create user with profile image
router.get("/log-in", authController.logIn) //auth
router.get("/logout", authController.logout) //logout
router.get("/activate/:link", authController.activate) //activate
router.get("/refresh", authController.refresh) //refresh


module.exports = router;
