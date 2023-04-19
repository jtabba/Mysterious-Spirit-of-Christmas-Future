import { ActiveUtilsProvider } from "../activeParticipants/utils/useActiveUtils";
import { InputUtilsProvider } from "../inputParticipants/utils/useInputUtils";
import { ActiveParticipants } from "../activeParticipants/ActiveParticipants";
import { InputParticipants } from "../inputParticipants/InputParticipants";
import { Stack, Image, Text } from "@chakra-ui/react";
import { SnowControllButton } from "../snowControl";
import { MainBodyContainer } from "../../styles";

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
				Choose your Secret Santas
			</Text>
			<Stack direction="row" gap="100px">
				<InputUtilsProvider>
					<InputParticipants />
				</InputUtilsProvider>

				<ActiveUtilsProvider>
					<ActiveParticipants />
				</ActiveUtilsProvider>
			</Stack>
		</MainBodyContainer>
	</>
);
