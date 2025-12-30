import express from "express";
import { logOut, registerUser, signIn } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", signIn);
router.get("/logout", logOut);

export default router;
