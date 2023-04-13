import { Stack, HStack, Text, Button } from "@chakra-ui/react";
import { useActiveUtils } from "./useActiveUtils";
import { DeleteParticipant } from "./DeleteParticipant";
import { SubmissionAlertDialog } from "./SubmissionAlertDialog";
import { DividerYellow, MainBodySegment, TextMedium } from "../../styles";

export const ActiveParticipants = () => {
	const {
		isOpen,
		participants,
		isSubmitActive,
		setOpen,
		setClosed,
		setParticipants
	} = useActiveUtils();

	return (
		<MainBodySegment>
			<SubmissionAlertDialog isOpen={isOpen} setClosed={setClosed} />

			<TextMedium text={"The Nice List 🎁"} />
			<DividerYellow />

			<Stack h="16rem" w="30rem" overflowY="scroll">
				{participants.map(({ name, email, id }, index) => (
					<HStack justifyContent="space-between" key={id}>
						<Text fontSize="xl" color="primary.white">
							{index + 1}) {name} ({email})
						</Text>
						<DeleteParticipant
							participantId={id}
							participants={participants}
							setParticipants={setParticipants}
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
