import { ActiveParticipants } from "../activeParticipants/ActiveParticipants";
import { InputParticipants } from "../inputParticipants/InputParticipants";
import { Stack, Container, Text, Button } from "@chakra-ui/react";

export const MainBody = () => {
	return (
		<Stack
			justify="center"
			spacing="40px"
			bg="green.600"
			padding="4rem"
			borderRadius={5}
		>
			<Text fontSize="4xl" align="center" color="red.500">
				Who will be participating in this years Secret Santa?
			</Text>
			<Stack direction="row" gap="100px">
				<InputParticipants />
				<ActiveParticipants />
			</Stack>
		</Stack>
	);
};
