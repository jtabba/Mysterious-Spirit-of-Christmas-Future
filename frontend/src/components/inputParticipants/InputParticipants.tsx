import { ParticipantDetailsValidation } from "./inputValidation/ParticipantDetailsValidation";
import { DividerYellow, MainBodySegment, TextMedium } from "../../styles";
import { useInputUtils } from "./utils/useInputUtils";
import { Button } from "@chakra-ui/react";

export const InputParticipants = () => {
	const { control, errors, isDirty, isValid, addParticipant } =
		useInputUtils();

	return (
		<MainBodySegment>
			<TextMedium text={"Add them here!"} />
			<DividerYellow />

			<ParticipantDetailsValidation
				control={control}
				fieldName={"name"}
				participantDetailsKey={"name"}
				errors={errors}
			/>
			<ParticipantDetailsValidation
				control={control}
				fieldName={"email"}
				participantDetailsKey={"email"}
				errors={errors}
			/>

			<DividerYellow />
			<Button
				colorScheme="red"
				size="md"
				type="submit"
				isDisabled={!isDirty || !isValid}
				onClick={(event) => {
					event.preventDefault();
					addParticipant();
				}}
			>
				Add Participant
			</Button>
		</MainBodySegment>
	);
};
