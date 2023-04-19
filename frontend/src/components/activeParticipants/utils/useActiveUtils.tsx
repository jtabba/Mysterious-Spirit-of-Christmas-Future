import { IParticipantDetails, WithChildren } from "../../../types";
import { useSecretSantaStore } from "../../../store";
import { useDisclosure } from "@chakra-ui/react";
import {
	Dispatch,
	FC,
	RefObject,
	SetStateAction,
	createContext,
	useContext,
	useRef,
	useState
} from "react";

interface ActiveUtils {
	budget: string;
	isOpen: boolean;
	isLoading: boolean;
	emailMessage: string;
	isSubmitActive: boolean;
	defaultEmailMessage: string;
	cancelRef: RefObject<HTMLButtonElement>;
	participantsDetails: IParticipantDetails[];
	setOpen: () => void;
	setClosed: () => void;
	setBudget: Dispatch<SetStateAction<string>>;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	setEmailMessage: Dispatch<SetStateAction<string>>;
	setParticipantsDetails: (participants: IParticipantDetails[]) => void;
}

const UtilsContext = createContext<ActiveUtils | undefined>(undefined);

export const ActiveUtilsProvider: FC<WithChildren> = ({ children }) => {
	const { participantsDetails, setParticipantsDetails } = useSecretSantaStore(
		({ participantsDetails, setParticipantsDetails }) => ({
			participantsDetails,
			setParticipantsDetails
		})
	);
	const { isOpen, onOpen: setOpen, onClose: setClosed } = useDisclosure();
	const defaultEmailMessage =
		"Let's see what kind of exciting gift you can find them!";
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isSubmitActive = participantsDetails.length <= 1;
	const [budget, setBudget] = useState<string>("25");
	const cancelRef = useRef<HTMLButtonElement>(null);
	const [emailMessage, setEmailMessage] =
		useState<string>(defaultEmailMessage);

	const activeUtilsContetxValue = {
		isOpen,
		budget,
		cancelRef,
		participantsDetails,
		emailMessage,
		isSubmitActive,
		defaultEmailMessage,
		isLoading,
		setOpen,
		setBudget,
		setClosed,
		setEmailMessage,
		setParticipantsDetails,
		setIsLoading
	};

	return (
		<UtilsContext.Provider value={activeUtilsContetxValue}>
			{children}
		</UtilsContext.Provider>
	);
};

export const useActiveUtils = () => {
	const context = useContext(UtilsContext);

	if (!context) {
		throw new Error("AtiveUtilsProvider must be used");
	}

	return context;
};
