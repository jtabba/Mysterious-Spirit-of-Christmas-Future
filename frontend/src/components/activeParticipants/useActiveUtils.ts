import ParticipantsDetailsService from "../../controllers/participantsDetailsController";
import { useSecretSantaStore } from "../../store";

export const useActiveUtils = () => {
	const { participants } = useSecretSantaStore(({ participants }) => ({
		participants
	}));
	const _participantsDetailsService = new ParticipantsDetailsService();

	const postParticipantsDetails = async () => {
		await _participantsDetailsService.postData(participants, "");
	};

	const isSubmitActive = participants.length === 0;

	return {
		participants,
		isSubmitActive,
		postParticipantsDetails
	};
};
