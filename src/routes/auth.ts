import express from "express";
import { loginUser, refreshUserToken, whoAmI } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh", refreshUserToken);
router.get("/whoami", authMiddleware, whoAmI);

export default router;
