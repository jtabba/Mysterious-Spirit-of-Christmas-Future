import { checkForXss, getRequestData } from "../utils.ts";
import { createPairsAndSendEmails } from "../mailer";
import * as dotenv from "dotenv";
dotenv.config();

const API_PASSWORD: string = process.env.API_PASSWORD!;
const xssWatchlist: Map<string, number> = new Map(); // Let's pretend I'm using an actual database for this variable
const blacklistedIps: Set<string> = new Set(); /// ...This one too

class SecretSantaService {
	createSecretSantaInstance(userIp: string, reqBody: unknown) {
		if (blacklistedIps.has(userIp)) {
			return {
				status: 401,
				message: "You have been banned for abusing our service"
			};
		}

		const { participantsDetails, emailMessage, budget } =
			getRequestData(reqBody);
		const { messageContainsXss, sanitisedEmailMessage, responseMessage } =
			checkForXss(emailMessage, userIp, xssWatchlist, blacklistedIps);

		if (messageContainsXss) {
			return {
				status: 400,
				message: responseMessage
			};
		} else {
			createPairsAndSendEmails(
				participantsDetails,
				sanitisedEmailMessage,
				budget
			);

			return {
				status: 200,
				message: responseMessage
			};
		}
	}

	getBlacklistedIps(authAttempt: string) {
		if (authAttempt !== API_PASSWORD) {
			return {
				status: 403,
				message: "The fuck you doin' here son"
			};
		}

		return {
			status: 200,
			message: [...blacklistedIps]
		};
	}

	removeBlacklistedIp(authAttempt: string, ipToUnban: string) {
		console.log(authAttempt);
		if (authAttempt !== API_PASSWORD) {
			return {
				status: 403,
				message:
					"If you want to be unbanned all you have to do is ask nicely..."
			};
		}

		if (!blacklistedIps.has(ipToUnban)) {
			return {
				status: 400,
				message: `${ipToUnban} is not blacklisted`
			};
		}

		blacklistedIps.delete(ipToUnban);

		return {
			status: 200,
			message: `${ipToUnban} has been unbanned`
		};
	}
}

export default SecretSantaService;
