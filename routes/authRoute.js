import express from "express";

const router = express.Router()      

router.route('/signUp').post(signUp)
router.route('/signIn').post(signIn)

export default router;