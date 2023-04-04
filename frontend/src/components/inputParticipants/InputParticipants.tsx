import { ParticipantDetailsValidation } from "./inputValidation/ParticipantDetailsValidation";
import { Stack, Button, Text, Divider } from "@chakra-ui/react";
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
		<Stack justifyItems="left" width="45%" spacing="1rem">
			<Text fontSize="2xl">Add participants' details</Text>
			<Divider borderColor="gray.200" />
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
			<Divider borderColor="gray.200" />
			<Button
				colorScheme="red"
				size="md"
				isDisabled={isSubmitDisabled}
				onClick={addParticipant}
			>
				Add Participant
			</Button>
		</Stack>
	);
};
