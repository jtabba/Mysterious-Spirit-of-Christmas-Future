import {
	VStack,
	Text,
	Textarea,
	Switch,
	Divider,
	HStack
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface ISetEmailMessage {
	budget: string;
	emailMessage: string;
	defaultEmailMessage: string;
	setEmailMessage: Dispatch<SetStateAction<string>>;
}

export const SetEmailMessage: FC<ISetEmailMessage> = ({
	budget,
	emailMessage,
	defaultEmailMessage,
	setEmailMessage
}) => {
	const [isCustomMessage, setIsCustomMessage] = useState<boolean>(false);

	useEffect(() => {
		setEmailMessage(defaultEmailMessage);
	}, [budget, isCustomMessage]);

	return (
		<>
			<HStack>
				<Text fontSize="xl" fontWeight="semibold" margin={2}>
					Customise email
				</Text>
				<Switch
					id="email-message"
					aria-label="Custom message"
					onChange={() => setIsCustomMessage(!isCustomMessage)}
				/>
			</HStack>
			<VStack
				borderRadius={5}
				alignItems="left"
				backgroundColor="lightgrey"
				borderRightRadius={5}
				border="1px solid black"
				margin={2.5}
				padding={5}
			>
				<Text>Hi (Participant's name),</Text>
				<br />
				<Text>
					You have been chosen as (random participant's) Secret Santa!
					The budget for this year is ${budget}.
				</Text>
				{isCustomMessage ? (
					<Textarea
						minHeight="15rem"
						borderRadius={0}
						variant="filled"
						size="md"
						value={emailMessage}
						onChange={(event) =>
							setEmailMessage(event.currentTarget.value)
						}
					/>
				) : (
					<Text>{defaultEmailMessage}</Text>
				)}
				<br />
				<Text margin={0} padding={0}>
					Merry Christmas,
				</Text>
				<Text>Mysterious Spirit of Christmas Future</Text>
			</VStack>
			<Divider colorScheme="grey.800" />
		</>
	);
};
