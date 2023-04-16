import { ParticipantDetailsValidation } from "./inputValidation/ParticipantDetailsValidation";
import { DividerYellow, MainBodySegment, TextMedium } from "../../styles";
import { useInputUtils } from "./useInputUtils";
import { Button } from "@chakra-ui/react";

export const InputParticipants = () => {
	const {
		control,
		errors,
		isSubmitDisabled,
		participantDetails,
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
