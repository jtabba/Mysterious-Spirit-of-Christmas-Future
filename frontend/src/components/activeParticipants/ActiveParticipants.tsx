import { SubmissionAlertDialog } from "./dialogOverlay/SubmissionAlertDialog";
import { DividerYellow, MainBodySegment, TextMedium } from "../../styles";
import { Stack, HStack, Text, Button } from "@chakra-ui/react";
import { useActiveUtils } from "./utils/useActiveUtils";
import { DeleteParticipant } from "./DeleteParticipant";

export const ActiveParticipants = () => {
	const {
		participantsDetails,
		isSubmitActive,
		isOpen,
		setOpen,
		setClosed,
		setParticipantsDetails
	} = useActiveUtils();

	return (
		<MainBodySegment>
			<SubmissionAlertDialog isOpen={isOpen} setClosed={setClosed} />

			<TextMedium text={"The Nice List 🎁"} />
			<DividerYellow />

			<Stack h="16rem" w="30rem" overflowY="scroll">
				{participantsDetails.map(({ name, email, id }, index) => (
					<HStack justifyContent="space-between" key={id}>
						<Text fontSize="xl" color="primary.white">
							{index + 1}) {name} ({email})
						</Text>
						<DeleteParticipant
							participantId={id}
							participants={participantsDetails}
							setParticipants={setParticipantsDetails}
						/>
					</HStack>
				))}
			</Stack>

			<DividerYellow />
			<Button
				colorScheme="red"
				size="md"
				isDisabled={isSubmitActive}
				onClick={setOpen}
			>
				Submit Participants
			</Button>
		</MainBodySegment>
	);
};
