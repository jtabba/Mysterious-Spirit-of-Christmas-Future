import { IParticipantDetails, WithChildren } from "../../../types";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { ParticipantsSchema } from "../inputValidation/schema";
import { FC, createContext, useContext } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useSecretSantaStore } from "../../../store";
import { v4 as uuid } from "uuid";

interface InputUtils {
	isDirty: boolean;
	isValid: boolean;
	errors: FieldErrors<IParticipantDetails>;
	control: Control<IParticipantDetails, any>;
	addParticipant: () => void;
	formatPlaceholder: (participantDetailsKey: string) => string;
}

const UtilsContext = createContext<InputUtils | undefined>(undefined);

export const InputUtilsProvider: FC<WithChildren> = ({ children }) => {
	const { participantsDetails, setParticipantsDetails } = useSecretSantaStore(
		({ participantsDetails, setParticipantsDetails }) => ({
			participantsDetails,
			setParticipantsDetails
		})
	);

	const {
		control,
		formState: { errors, isDirty, isValid },
		getValues,
		reset
	} = useForm<IParticipantDetails>({
		defaultValues: {
			name: "",
			email: ""
		},
		resolver: joiResolver(ParticipantsSchema),
		mode: "onChange"
	});
	const { name, email } = getValues();

	const formatPlaceholder = (participantDetailsKey: string) =>
		participantDetailsKey
			.split("")
			.map((char, index) => (index === 0 ? char.toUpperCase() : char))
			.join("");

	const addParticipant = () => {
		const participantDetails: IParticipantDetails = {
			name,
			email,
			id: uuid()
		};

		setParticipantsDetails([...participantsDetails, participantDetails]);
		reset();
	};

	const utilsContextValue = {
		control,
		errors,
		isDirty,
		isValid,
		formatPlaceholder,
		addParticipant
	};

	return (
		<UtilsContext.Provider value={utilsContextValue}>
			{children}
		</UtilsContext.Provider>
	);
};

export const useInputUtils = () => {
	const context = useContext(UtilsContext);

	if (!context) {
		throw new Error("InputUtilsProvider must be used");
	}

	return context;
};
