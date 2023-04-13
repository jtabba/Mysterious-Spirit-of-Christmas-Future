import { IRequestsService } from "./requestsControllerInterface";
const PARTICIPANTS_API_URL = process.env.PARTICIPANTS_API_URL;
import { IParticipantDetails } from "../src/types";
import axios from "axios";

interface IParticipantsPostDataParams {
	participantsDetails: IParticipantDetails[];
	emailMessage: string;
	budget: string;
}

class ParticipantsDetailsService implements IRequestsService {
	async postData(
		params: IParticipantsPostDataParams,
		route: string
	): Promise<Response> {
		try {
			const res: Response = await axios.post(
				`${PARTICIPANTS_API_URL}/${route}`,
				params
			);

			return res;
		} catch (error) {
			console.log(error);

			throw new Error("Failed to post participants details");
		}
	}
}

export default ParticipantsDetailsService;
