import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IParticipantDetails } from "../types";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

type IParticipantData = Map<"email" | "name", string>;
type IParticipantsById = Map<string, IParticipantData>;

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		type: "login",
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
} as SMTPTransport.Options);

const generateDataStructures = (participantsDetails: IParticipantDetails[]) => {
	const participantsById: IParticipantsById = new Map();
	const giftGivers: string[] = []; // remove and use map above
	const giftReceivers: string[] = [];
	const secretSantaPairs: Map<string, string> = new Map();

	participantsDetails.forEach(({ name, email, id }) => {
		const participant: IParticipantData = new Map();
		participant.set("email", email);
		participant.set("name", name);
		participantsById.set(id, participant);

		giftGivers.push(id);
		giftReceivers.push(id);
	});

	return {
		participantsById,
		giftGivers,
		giftReceivers,
		secretSantaPairs
	};
};

export const generateSecretSantaPairs = async (
	participantsDetails: IParticipantDetails[],
	emailMessage: string,
	budget: string
) => {
	const currentYear = new Date().getFullYear();
	const { participantsById, giftGivers, giftReceivers, secretSantaPairs } =
		generateDataStructures(participantsDetails);

	for (let i = 0; i < giftGivers.length; i++) {
		// change to forEach
		let assigned = false;

		while (!assigned) {
			let giftRecieverIndex = Math.floor(
				Math.random() * giftReceivers.length
			);

			if (giftReceivers[giftRecieverIndex] != giftGivers[i]) {
				secretSantaPairs.set(
					giftGivers[i],
					giftReceivers[giftRecieverIndex]
				);
				giftReceivers.splice(giftRecieverIndex, 1);

				assigned = true;
			}
		}

		const giftGiversEmail = participantsById
			.get(giftGivers[i])!
			.get("email");
		const giftGiversName = participantsById.get(giftGivers[i])!.get("name");
		const giftReceiverssName = participantsById
			.get(secretSantaPairs.get(giftGivers[i])!)!
			.get("name");

		let mailOptions = {
			from: process.env.EMAIL,
			to: giftGiversEmail,
			subject: `Your ${currentYear} Secret Santa!`,
			text: `
Hi ${giftGiversName!.split(" ")[0]},


You have been chosen as ${giftReceiverssName}'s Secret Santa! The budget for this year is $${budget}. 

${emailMessage}


Merry Christmas,
Mysterious Spirit of Christmas Future,
`
		};

		transporter.sendMail(mailOptions, (err: Error | null) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Email sent successfully to " + giftGivers[i]);
			}
		});
	}
	console.log("All Secret Santa's sent");
};
