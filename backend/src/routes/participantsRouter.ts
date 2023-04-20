import { secretSantaLimiter } from "../middleware/rateLimiter";
import { generateSecretSantaPairs } from "../mailer";
import { Request, Response, Router } from "express";
import { IParticipantDetails } from "../types";
import CryptoJs from "crypto-js";
import * as dotenv from "dotenv";
dotenv.config();

const participantsRouter = Router();
const ENCRYPTION_PASSPHRASE: string = process.env.ENCRYPTION_PASSPHRASE!;

participantsRouter.post(
	"/send",
	secretSantaLimiter,
	(req: Request, res: Response) => {
		try {
			const participantsDetailsBytes = CryptoJs.AES.decrypt(
				req.body.participantsDetails,
				ENCRYPTION_PASSPHRASE
			);
			const participantsDetails: IParticipantDetails[] = JSON.parse(
				participantsDetailsBytes.toString(CryptoJs.enc.Utf8)
			);

			const emailMessage: string = req.body.emailMessage;
			const budget: string = req.body.budget;

			generateSecretSantaPairs(participantsDetails, emailMessage, budget);

			res.send({
				status: 200,
				message: "Participants' details received!"
			});
		} catch (err: Error | unknown) {
			res.send({
				status: 400,
				message: err
			});

			throw new Error(`Failed to get participant details: ${err}`);
		}
	}
);

export default participantsRouter;
