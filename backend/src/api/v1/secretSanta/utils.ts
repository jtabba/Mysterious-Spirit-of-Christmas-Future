import { IParticipantDetails } from "../../..//types";
import CryptoJs from "crypto-js";
import * as dotenv from "dotenv";
import xss from "xss";
dotenv.config();

const ENCRYPTION_PASSPHRASE: string = process.env.ENCRYPTION_PASSPHRASE!;

export const checkForXss = (
	message: string,
	userIp: string,
	xssWatchlist: Map<string, number>,
	blacklistedIps: Set<string>
) => {
	const xssFilter = {
		whiteList: {},
		stripIgnoreTag: true,
		stripIgnoreTagBody: ["script", "a", "img"]
	};
	const sanitisedEmailMessage = xss(message, xssFilter);
	const urlKeywordFilter = [
		"http",
		"https",
		"com",
		"net",
		"au",
		"org",
		"xyz"
	];
	const urlKeyword = message
		.split(/[/|;|&|:| |.]/)
		.find((emailWord) => urlKeywordFilter.includes(emailWord));

	if (sanitisedEmailMessage !== message || urlKeyword !== undefined) {
		console.log(`XSS attack attempted from ${userIp}`);
		if (xssWatchlist.has(userIp)) {
			const xssAttempts = xssWatchlist.get(userIp)! + 1;

			if (xssAttempts === 2) {
				blacklistedIps.add(userIp);
				xssWatchlist.delete(userIp);
			}

			xssWatchlist.set(userIp, xssAttempts);
		} else {
			xssWatchlist.set(userIp, 1);
		}

		return {
			messageContainsXss: true,
			sanitisedEmailMessage: "",
			responseMessage: urlKeywordFilter.includes(urlKeyword!)
				? "Please do not use links in your custom email"
				: "It appears that you have used HTML tags in your custom email. Don't do that - XSS attempts are not appreciated"
		};
	}

	return {
		messageContainsXss: false,
		sanitisedEmailMessage,
		responseMessage:
			"Participants' details received! Thank you for using Mysterious Spirit of Christmas Future"
	};
};

export const getRequestData = (requestBody: any) => {
	const participantsDetailsBytes = CryptoJs.AES.decrypt(
		requestBody.participantsDetails,
		ENCRYPTION_PASSPHRASE
	);
	const participantsDetails: IParticipantDetails[] = JSON.parse(
		participantsDetailsBytes.toString(CryptoJs.enc.Utf8)
	);
	const emailMessage: string = requestBody.emailMessage;
	const budget: string = requestBody.budget;

	return {
		participantsDetails,
		emailMessage,
		budget
	};
};
