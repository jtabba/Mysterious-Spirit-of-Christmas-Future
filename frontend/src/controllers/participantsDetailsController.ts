import { IParticipantDetails } from "../components/inputParticipants/types";
import { IRequestsService } from "./requestsControllerInterface";
import axios from "axios";
// const { REACT_APP_API_URL } = process.env;

class ParticipantsDetailsService implements IRequestsService {
	async postData(participantsDetails: IParticipantDetails[], route: string) {
		try {
			await axios.post(`ENV URL HERE/{${route}}`, participantsDetails);
		} catch (error) {
			console.log(error);

			throw new Error("Failed to post participants details");
		}
	}
}

export default ParticipantsDetailsService;
