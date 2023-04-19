import { Control, Controller, FieldErrors } from "react-hook-form";
import { InputValidation, TextError } from "../../../styles";
import { useInputUtils } from "../utils/useInputUtils";
import { IParticipantDetails } from "../../../types";
import { FC } from "react";

export interface IParticipantDetailsValidation {
	control: Control<IParticipantDetails, any>;
	participantDetailsKey: string;
	errors: FieldErrors<IParticipantDetails>;
	fieldName: "name" | "email" | "id";
}

export const ParticipantDetailsValidation: FC<
	IParticipantDetailsValidation
> = ({ control, participantDetailsKey, errors }) => {
	const { formatPlaceholder } = useInputUtils();
	const _participantDetailsKey =
		participantDetailsKey as keyof IParticipantDetails;
	const errorMessage = errors[_participantDetailsKey]?.message ?? "";

	return (
		<Controller
			name={_participantDetailsKey}
			control={control}
			render={({ field }) => (
				<>
					<InputValidation
						{...field}
						placeholder={formatPlaceholder(participantDetailsKey)}
						type="string"
						value={field.value}
						onChange={({ currentTarget: { value } }) =>
							field.onChange(value)
						}
						color="primary.yellow"
					/>
					<TextError error={errorMessage} />
				</>
			)}
		/>
	);
};
