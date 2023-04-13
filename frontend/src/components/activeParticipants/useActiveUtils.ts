import { useRef, useState } from "react";
import ParticipantsDetailsService from "../../../controllers/participantsDetailsController";
import { useSecretSantaStore } from "../../store";
import { useDisclosure } from "@chakra-ui/react";

export const useActiveUtils = () => {
	const { participants, setParticipants } = useSecretSantaStore(
		({ participants, setParticipants }) => ({
			participants,
			setParticipants
		})
	);
	const { isOpen, onOpen: setOpen, onClose: setClosed } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);
	const [budget, setBudget] = useState<string>("25");
	const defaultEmailMessage = `Let's see what kind of exciting gift you can find them!
    `;

	const [emailMessage, setEmailMessage] =
		useState<string>(defaultEmailMessage);
	const _participantsDetailsService = new ParticipantsDetailsService();

	const isSubmitActive = participants.length === 0;

	return {
		isOpen,
		budget,
		cancelRef,
		participants,
		emailMessage,
		isSubmitActive,
		defaultEmailMessage,
		_participantsDetailsService,
		setOpen,
		setBudget,
		setClosed,
		setEmailMessage,
		setParticipants
	};
};
