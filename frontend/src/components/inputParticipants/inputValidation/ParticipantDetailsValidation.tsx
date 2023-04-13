import {
	IParticipantDetails,
	IParticipantDetailsValidation
} from "../../../types";
import { useInputUtils } from "../useInputUtils";
import { Input, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
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
					<Input
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
					/>
					<Text height={4} color="red.600" fontWeight={500}>
						{errorMessage}
					</Text>
				</>
			)}
		/>
	);
};
