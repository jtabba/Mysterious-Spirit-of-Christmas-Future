import { Stack, Text, Box, Button, Divider } from "@chakra-ui/react";
import { useActiveUtils } from "./useActiveUtils";

export const ActiveParticipants = () => {
	const { participants, isSubmitActive, postParticipantsDetails } =
		useActiveUtils();

	return (
		<Stack justify="right" width="45%" spacing="1rem">
			<Text fontSize="2xl">Who made the cut?</Text>
			<Divider borderColor="gray.200" />
			<Stack h="25rem" width="90%" overflowY="scroll">
				{participants.map(({ name, email, id }, index) => (
					<Box key={id}>
						<Text fontSize="xl" marginLeft={15} color="red.600">
							{index + 1}. {name}
						</Text>
						<Text fontSize="lg" marginLeft={30} color="red.600">
							{email}
						</Text>
					</Box>
				))}
			</Stack>
			<Divider borderColor="gray.200" />
			<Button
				colorScheme="red"
				size="md"
				isDisabled={isSubmitActive}
				onClick={postParticipantsDetails}
			>
				Submit Participants
			</Button>
		</Stack>
	);
};
