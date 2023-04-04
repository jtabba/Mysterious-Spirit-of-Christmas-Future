import { ParticipantsSchema } from "./inputValidation/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useSecretSantaStore } from "../../store";
import { IParticipantDetails } from "./types";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { useState } from "react";

export const useInputUtils = () => {
	const { participants, setParticipants } = useSecretSantaStore(
		({ participants, setParticipants }) => ({
			participants,
			setParticipants
		})
	);

	const defaultValues: IParticipantDetails = {
		name: "",
		email: ""
	};

	const [participantDetails, setParticipantDetails] =
		useState<IParticipantDetails>(defaultValues);

	const [isEmailInUse, setIsEmailInUse] = useState<boolean>(false);

	const {
		control,
		formState: { errors },
		reset
	} = useForm<IParticipantDetails>({
		defaultValues: defaultValues,
		resolver: joiResolver(ParticipantsSchema),
		mode: "all"
	});

	const formatPlaceholder = (participantDetailsKey: string) =>
		participantDetailsKey
			.split("")
			.map((char, index) => (index === 0 ? char.toUpperCase() : char))
			.join("");

	const handleChange = (key: string, value: string) =>
		setParticipantDetails({
			...participantDetails,
			[key]: value,
			id: uuid()
		});

	const addParticipant = () => {
		// Add proper char formatting
		setParticipants([...participants, participantDetails]);
		setParticipantDetails(defaultValues);
		reset();
	};

	console.log(participantDetails);

	// const getErrorMessage = (
	// 	participantDetailsKey: keyof IParticipantDetails,
	// 	inputValue: string
	// ) => {
	// 	const inputValueLength = inputValue.split("").length;
	// 	const extension = inputValue.slice(
	// 		inputValueLength - 3,
	// 		inputValueLength
	// 	);
	// 	const emailExtensions = ["com", "net"];

	// 	if (
	// 		participantDetailsKey !== "email" ||
	// 		!emailExtensions.includes(extension)
	// 	) {
	// 		return errors[participantDetailsKey]?.message ?? "";
	// 	}

	// 	for (const { email } of participants) {
	// 		if (inputValue === email) {
	// 			return "This email has already been used";
	// 		}
	// 	}
	// };

	const isSubmitDisabled: boolean =
		Object.keys(errors).length > 0 ||
		participantDetails.name === "" ||
		participantDetails.email === "";

	return {
		participantDetails,
		control,
		errors,
		isSubmitDisabled,
		participants,
		formatPlaceholder,
		addParticipant,
		handleChange
		// getErrorMessage,
		// setIsEmailInUse
	};
};
