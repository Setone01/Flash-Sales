import express from "express";
import { createUser } from "../controller/userController";
import { validateUser } from "../middleware/userValidation";

const router = express.Router();

router.post("/create-user", validateUser, createUser);

export default router;
