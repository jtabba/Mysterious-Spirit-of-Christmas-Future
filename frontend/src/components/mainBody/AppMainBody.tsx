import { MainBodyContainer } from "../../styles";
import { ActiveParticipants } from "../activeParticipants/ActiveParticipants";
import { InputParticipants } from "../inputParticipants/InputParticipants";
import { Stack, Image, Text, Button } from "@chakra-ui/react";
import { SnowControllButton } from "../snowControl";

export const AppMainBody = () => (
	<>
		<Image
			style={{ margin: "0 auto", width: "22rem", marginTop: "2rem" }}
			src="../../logo/logo.svg"
			alt=""
		/>
		<MainBodyContainer>
			<SnowControllButton />
			<Text
				fontSize="5xl"
				align="center"
				color="primary.yellow"
				fontFamily="sans-serif"
			>
				Who are your Secret Santas?
			</Text>
			<Stack direction="row" gap="100px">
				<InputParticipants />
				<ActiveParticipants />
			</Stack>
		</MainBodyContainer>
	</>
);
