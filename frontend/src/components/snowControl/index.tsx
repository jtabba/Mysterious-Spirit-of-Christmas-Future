import { SnowButton, SnowControlButton } from "../../styles";
import { useSecretSantaStore } from "../../store";
import { HStack, Text } from "@chakra-ui/react";
import { themeRed } from "../../theme/theme";
import { useState } from "react";

export const SnowControllButton = () => {
	const [showSnowControl, setShowSnowControl] = useState<boolean>(false);
	const handleShowSnowControl = (isOff?: boolean) => {
		setShowSnowControl(isOff ?? !showSnowControl);
	};
	const { setSnowRate, snowRate } = useSecretSantaStore(
		({ setSnowRate, snowRate }) => ({
			setSnowRate,
			snowRate
		})
	);

	return (
		<HStack
			position="absolute"
			top={5}
			left={5}
			onMouseLeave={() => handleShowSnowControl(false)}
			onMouseEnter={() => handleShowSnowControl(true)}
		>
			<SnowControlButton>
				<Text fontSize="3xl" fontWeight="hairline">
					❆
				</Text>
			</SnowControlButton>
			{showSnowControl && (
				<HStack onMouseLeave={() => handleShowSnowControl()}>
					{/* Can turn buttons into custom group */}
					<SnowButton
						isActive={snowRate === 0 ?? true}
						onClick={() => setSnowRate(0)}
						border={
							snowRate === 0 ? `2px solid ${themeRed}` : "none"
						}
					>
						🚫
					</SnowButton>
					<SnowButton
						isActive={snowRate === 50 ?? true}
						onClick={() => setSnowRate(50)}
						border={
							snowRate === 50 ? `2px solid ${themeRed}` : "none"
						}
					>
						L
					</SnowButton>
					<SnowButton
						isActive={snowRate === 100 ?? true}
						onClick={() => setSnowRate(100)}
						border={
							snowRate === 100 ? `2px solid ${themeRed}` : "none"
						}
					>
						M
					</SnowButton>
					<SnowButton
						isActive={snowRate === 150 ?? true}
						onClick={() => setSnowRate(150)}
						border={
							snowRate === 150 ? `2px solid ${themeRed}` : "none"
						}
					>
						H
					</SnowButton>
				</HStack>
			)}
		</HStack>
	);
};
