const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/album", userRouter)
router.use("/track", userRouter)
router.use("/playlist", userRouter)
router.use("/single", userRouter)
router.use("/ep", userRouter)
router.use("/connection", userRouter)


module.exports = router;
