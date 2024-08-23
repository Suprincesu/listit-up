import { Router } from "express";
import * as AuthController from "./auth.controller";
import validate from "../../core/middleware/validate.middleware";
import { loginValidation, signUpValidation } from "./auth.validation";

const router = Router();

router.post("/login", validate(loginValidation), AuthController.login);
router.post("/signup", validate(signUpValidation), AuthController.signUp);

export default router;
