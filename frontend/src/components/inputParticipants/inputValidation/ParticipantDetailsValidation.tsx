import {
	IParticipantDetails,
	IParticipantDetailsValidation
} from "../../../types";
import { useInputUtils } from "../useInputUtils";
import { Controller } from "react-hook-form";
import { InputValidation, TextError } from "../../../styles";
import { Input } from "@chakra-ui/react";
import { FC } from "react";

export const ParticipantDetailsValidation: FC<
	IParticipantDetailsValidation
> = ({ control, inputValue, participantDetailsKey, errors, handleChange }) => {
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
						value={inputValue}
						onChange={(event) => {
							field.onChange(event);
							handleChange(
								participantDetailsKey,
								event.target.value
							);
						}}
						color="primary.yellow"
					/>
					<TextError error={errorMessage} />
				</>
			)}
		/>
	);
};
