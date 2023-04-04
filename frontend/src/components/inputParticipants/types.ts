import { Control, FieldErrors } from "react-hook-form";

export interface IParticipantDetails {
	name: string;
	email: string;
	id?: string;
}

export interface IParticipantDetailsValidation {
	control: Control<IParticipantDetails, any>;
	inputValue: string;
	participantDetailsKey: string;
	errors: FieldErrors<IParticipantDetails>;
	handleChange: (key: string, value: string) => void;
}
