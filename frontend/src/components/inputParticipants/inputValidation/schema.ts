import { IParticipantDetails } from "../types";
import Joi from "joi";

export const ParticipantsSchema = Joi.object<IParticipantDetails>({
	name: Joi.string().min(1).max(50).required().messages({
		"string.required": `Participants require a name`,
		"string.empty": `Participants require a name`,
		"string.min": `Participant name's must be at least {#limit} character long`,
		"string.max": `Participant name's cannot be greater than {#limit} characters long`
	}),
	email: Joi.string()
		.email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required()
		.messages({
			"string.required": `Participant's email is required`,
			"string.empty": `Participant's email is required`,
			"string.email": `Participant's email is invalid`
		})
});
