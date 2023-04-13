import { Stack, HStack, Text, Box, Button, Divider } from "@chakra-ui/react";
import { useActiveUtils } from "./useActiveUtils";
import { DeleteParticipant } from "./DeleteParticipant";
import { SubmitAlertDialog } from "./SubmitAlertDialog";

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
		<Stack justify="right" width="45%" spacing="1rem">
			<SubmitAlertDialog isOpen={isOpen} setClosed={setClosed} />
			<Text fontSize="2xl">Who made the cut?</Text>
			<Divider borderColor="gray.200" />
			<Stack h="25rem" width="90%" overflowY="scroll">
				{participants.map(({ name, email, id }, index) => (
					<HStack justifyContent="space-between" key={id}>
						<Box>
							<Text fontSize="xl" marginLeft={15} color="red.600">
								{index + 1}. {name}
							</Text>
							<Text fontSize="lg" marginLeft={30} color="red.600">
								{email}
							</Text>
						</Box>
						<DeleteParticipant
							participantId={id}
							participants={participants}
							setParticipants={setParticipants}
						/>
					</HStack>
				))}
			</Stack>
			<Divider borderColor="gray.200" />
			<Button
				colorScheme="red"
				size="md"
				isDisabled={isSubmitActive}
				onClick={setOpen}
			>
				Submit Participants
			</Button>
		</Stack>
	);
};
