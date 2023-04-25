import { secretSantaLimiter } from "../middleware/rateLimiter";
import { checkForXss, getRequestData } from "./utils.ts";
import { generateSecretSantaPairs } from "../mailer";
import { Request, Response, Router } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const API_PASSWORD: string = process.env.API_PASSWORD!;
const xssWatchlist: Map<string, number> = new Map(); // Let's pretend I'm using an actual database for this variable
const blacklistedIps: Set<string> = new Set(); /// ...This one too
const participantsRouter = Router();

blacklistedIps.add("::1");
participantsRouter.post(
	"/send",
	secretSantaLimiter,
	(req: Request, res: Response) => {
		try {
			const userIp: string = req.socket.remoteAddress!;

			if (blacklistedIps.has(userIp)) {
				return res.send({
					status: 401,
					message: "You have been banned for abusing our service"
				});
			}

			const { participantsDetails, emailMessage, budget } =
				getRequestData(req.body);

			const {
				messageContainsXss,
				sanitisedEmailMessage,
				responseMessage
			} = checkForXss(emailMessage, userIp, xssWatchlist, blacklistedIps);

			if (messageContainsXss) {
				return res.send({
					status: 400,
					message: responseMessage
				});
			}

			generateSecretSantaPairs(
				participantsDetails,
				sanitisedEmailMessage,
				budget
			);

			return res.send({
				status: 200,
				message: responseMessage
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

participantsRouter.post(
	"/getBlacklistedIpAddresses",
	secretSantaLimiter,
	(req: Request, res: Response) => {
		try {
			const authAttempt = req.body.password;

			if (authAttempt !== API_PASSWORD) {
				return res.send({
					status: 403,
					message: "The fuck you doin' here son"
				});
			}

			return res.send({
				status: 200,
				message: [...blacklistedIps]
			});
		} catch (err: Error | unknown) {
			res.send({
				status: 400,
				message: err
			});

			throw new Error(`Failed to get data: ${err}`);
		}
	}
);

participantsRouter.post(
	"/unbanSillyScripter",
	secretSantaLimiter,
	(req: Request, res: Response) => {
		try {
			const authAttempt = req.body.password;
			const ipToUnban = req.body.ip.toString();

			console.log(typeof ipToUnban);

			if (authAttempt !== API_PASSWORD) {
				return res.send({
					status: 403,
					message:
						"If you want to be unbanned all you have to do is ask nicely..."
				});
			}

			if (blacklistedIps.has(ipToUnban) === false) {
				return res.send({
					status: 400,
					message: `${ipToUnban} is not blacklisted`
				});
			}

			blacklistedIps.delete(ipToUnban);

			return res.send({
				status: 200,
				message: `${ipToUnban} has been unbanned`
			});
		} catch (err: Error | unknown) {}
	}
);

export default participantsRouter;
