import { ActiveParticipants } from "../activeParticipants/ActiveParticipants";
import { InputParticipants } from "../inputParticipants/InputParticipants";
import { customTheme } from "../../theme/theme";
import { Stack, Container, Text, Button } from "@chakra-ui/react";

export const MainBody = () => {
	// const borderColour =
	console.log(customTheme);
	return (
		<Stack
			justify="center"
			spacing="40px"
			bg="primary.200"
			padding="4rem"
			border="4px solid #E6BC00"
			borderRadius={5}
		>
			<Text fontSize="4xl" align="center" color="whiteAlpha.700">
				Who will be participating in this years Secret Santa?
			</Text>
			<Stack direction="row" gap="100px">
				<InputParticipants />
				<ActiveParticipants />
			</Stack>
		</Stack>
	);
};
