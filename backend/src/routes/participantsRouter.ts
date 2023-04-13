import { Request, Response, Router } from "express";
import { IParticipantDetails } from "../types";
import { generateSecretSantaPairs } from "../mailer";
export const participantsRouter = Router();

participantsRouter.post("/send", (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const participantsDetails: IParticipantDetails[] =
			req.body.participantsDetails;
		const emailMessage: string = req.body.emailMessage;
		const budget: string = req.body.budget;

		generateSecretSantaPairs(participantsDetails, emailMessage, budget);

		res.send({
			status: 200,
			message: "Participants' details received"
		});
	} catch (err: Error | unknown) {
		console.log(err);

		res.send({
			status: 400,
			message: err
		});

		throw new Error(`Failed to get participant details: ${err}`);
	}
});

export default participantsRouter;
