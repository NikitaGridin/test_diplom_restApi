const express = require('express');
const router = express.Router();
const albumRoute = require('./albumRoute')
const userRouter = require('./userRouter')

router.use("/album", userRouter)
router.use("/user", userRouter)
router.use("/track", userRouter)
router.use("/playlist", userRouter)
router.use("/single", userRouter)
router.use("/ep", userRouter)


module.exports = router;
