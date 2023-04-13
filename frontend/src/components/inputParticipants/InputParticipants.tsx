import { ParticipantDetailsValidation } from "./inputValidation/ParticipantDetailsValidation";
import { DividerYellow, MainBodySegment, TextMedium } from "../../styles";
import { Stack, Button } from "@chakra-ui/react";
import { customTheme } from "../../theme/theme";
import { useInputUtils } from "./useInputUtils";

export const InputParticipants = () => {
	const {
		control,
		participantDetails,
		errors,
		isSubmitDisabled,
		handleChange,
		addParticipant
	} = useInputUtils();

	return (
		<MainBodySegment>
			<TextMedium text={"Add them here!"} />
			<DividerYellow />

			<ParticipantDetailsValidation
				control={control}
				inputValue={participantDetails.name}
				participantDetailsKey={"name"}
				errors={errors}
				handleChange={handleChange}
			/>
			<ParticipantDetailsValidation
				control={control}
				inputValue={participantDetails.email}
				participantDetailsKey={"email"}
				errors={errors}
				handleChange={handleChange}
			/>
			<DividerYellow />

			<Button
				colorScheme="red"
				size="md"
				isDisabled={isSubmitDisabled}
				onClick={addParticipant}
			>
				Add Participant
			</Button>
		</MainBodySegment>
	);
};
