const express = require('express');
const router = express.Router();
const albumRoute = require('./albumRoute')
const userRouter = require('./userRouter')

router.use("/album", albumRoute)
router.use("/user", userRouter)
router.use("/track", userRouter)
router.use("/playlist", userRouter)


module.exports = router;
