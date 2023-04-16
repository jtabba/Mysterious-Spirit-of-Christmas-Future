import { HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SnowButton, SnowControlButton } from "../../styles";
import { useSecretSantaStore } from "../../store";

export const SnowControllButton = () => {
	const [showSnowControl, setShowSnowControl] = useState<boolean>(false);
	const { setSnowRate } = useSecretSantaStore(({ setSnowRate }) => ({
		setSnowRate
	}));
	const handleClick = () => {
		setShowSnowControl(!showSnowControl);
	};

	return (
		<HStack position="absolute" top={5} left={5}>
			<SnowControlButton onClick={handleClick}>
				<Text fontSize="3xl" fontWeight="hairline">
					❆
				</Text>
			</SnowControlButton>
			{showSnowControl && (
				<HStack>
					<SnowButton onClick={() => setSnowRate(0)}>X</SnowButton>
					<SnowButton onClick={() => setSnowRate(50)}>L</SnowButton>
					<SnowButton onClick={() => setSnowRate(100)}>M</SnowButton>
					<SnowButton onClick={() => setSnowRate(150)}>H</SnowButton>
				</HStack>
			)}
		</HStack>
	);
};
