import { IParticipantDetails } from "../types";
import { transporter, generateMailOptions } from "./mailerSetup";
import * as dotenv from "dotenv";
dotenv.config();

type IParticipantData = Map<"email" | "name", string>;
type IParticipantsById = Map<string, IParticipantData>;

const generateDataStructures = (participantsDetails: IParticipantDetails[]) => {
	const participantsById: IParticipantsById = new Map();
	const secretSantaPairs: Map<string, string> = new Map();
	const giftReceivers: string[] = [];

	participantsDetails.forEach(({ name, email, id }) => {
		const participant: IParticipantData = new Map();
		participantsById.set(id, participant);
		participant.set("email", email);
		participant.set("name", name);

		giftReceivers.push(id);
	});

	return {
		participantsById,
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
	const { participantsById, giftReceivers, secretSantaPairs } =
		generateDataStructures(participantsDetails);

	for (const [giftGiver, giftGiverData] of participantsById) {
		let assigned = false;

		while (!assigned) {
			let giftRecieverIndex = Math.floor(
				Math.random() * giftReceivers.length
			);

			if (giftReceivers[giftRecieverIndex] != giftGiver) {
				secretSantaPairs.set(
					giftGiver,
					giftReceivers[giftRecieverIndex]
				);
				giftReceivers.splice(giftRecieverIndex, 1);

				assigned = true;
			}
		}

		const giftGiversEmail = giftGiverData.get("email");
		const giftGiversName = giftGiverData.get("name");
		const giftReceiverssName = participantsById
			.get(secretSantaPairs.get(giftGiver)!)!
			.get("name");
		const mailOptions = generateMailOptions(
			giftReceiverssName!,
			giftGiversEmail!,
			giftGiversName!,
			emailMessage,
			budget,
			currentYear
		);

		transporter.sendMail(mailOptions, (err: Error | null) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Email sent successfully to " + giftGiversEmail);
			}
		});
	}

	console.log("All Secret Santa's sent");
};
