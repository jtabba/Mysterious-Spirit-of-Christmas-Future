import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { VStack, Text, Textarea, Switch, HStack } from "@chakra-ui/react";

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
	const sanitiseCustomEmail = (value: string) => {
		const xssMatch =
			/[<]*<[\s\u200B]*script[\s\u200B]*>.*[/]*[<]*<[\s\u200B]*\/[\s\u200B]*script[\s\u200B]*>/gi;

		const res = value.match(xssMatch);

		console.log(res);

		// RACE CONDITIONS FOR HERE AND DEFAULT EMAIL
	};

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
						onChange={(event) => {
							sanitiseCustomEmail(event.currentTarget.value);
							setEmailMessage(event.currentTarget.value);
						}}
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
		</>
	);
};
