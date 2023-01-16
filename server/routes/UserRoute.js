import express, { Router } from 'express';
const router = express.Router();
import {getAllUser,signup,login } from "../controllers/UserController.js"

router.get("/",getAllUser);
router.post("/signup",signup)
router.post("/login",login)

export default router