import SecretSantaController from "../secretSanta/controllers/secretSantaController";
import { secretSantaLimiter } from "../secretSanta/middleware/rateLimiter";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

const v1SecretSantaRouter = express.Router();
const secretSantaController = new SecretSantaController();

v1SecretSantaRouter.post(
	"/send",
	secretSantaLimiter,
	secretSantaController.createAndSendEmail
);

v1SecretSantaRouter.post(
	"/getBlacklistedIps",
	secretSantaLimiter,
	secretSantaController.getBlacklistedIps
);

v1SecretSantaRouter.post(
	"/unbanSillyScripter",
	secretSantaLimiter,
	secretSantaController.removeBlacklistedIp
);

export default v1SecretSantaRouter;
