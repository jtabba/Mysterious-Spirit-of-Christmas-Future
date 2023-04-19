import { themeYellow, darkGreen, themeWhite } from "../theme/theme";
import {
	forwardRef,
	Container,
	ContainerProps,
	Divider,
	Text,
	Input,
	InputProps,
	Button,
	ButtonProps,
	SpinnerProps,
	Spinner
} from "@chakra-ui/react";

export const DividerYellow = () => (
	<Divider borderColor="primary.yellow" borderBottomWidth={2} />
);

export const DividerGrey = () => (
	<Divider borderColor="grey.800" borderBottomWidth={2} />
);

export const TextMedium = ({ text }: { text: string }) => (
	<Text fontSize="2xl" color="primary.yellow" fontFamily="sans-serif">
		{text}
	</Text>
);

export const TextError = ({ error }: { error: string }) => (
	<Text height={6} color="primary.white" fontWeight="extrabold">
		{error}
	</Text>
);

export const MainBodyContainer = forwardRef<ContainerProps, "div">(
	(props, ref) => (
		<Container
			top="2rem"
			maxWidth="80Rem"
			maxHeight="42rem"
			position="relative"
			padding="4rem"
			margin="0 auto"
			bg="primary.green"
			borderRadius={10}
			border={`4px solid ${themeYellow}`}
			display="flex"
			flexDirection="column"
			gap={35}
			ref={ref}
			{...props}
		/>
	)
);

export const MainBodySegment = forwardRef<ContainerProps, "div">(
	(props, ref) => (
		<Container
			width="32rem"
			display="flex"
			flexDirection="column"
			gap="1rem"
			ref={ref}
			{...props}
		/>
	)
);

export const InputValidation = forwardRef<InputProps, "input">((props, ref) => (
	<Input
		variant="outlined"
		_placeholder={{ color: "primary.white" }}
		bg={darkGreen}
		_hover={{
			boxShadow: `0 0 0 1px ${themeYellow}`
		}}
		_focus={{
			boxShadow: `0 0 0 1px ${themeYellow}`,
			color: "primary.white"
		}}
		_autofill={{
			backgroundColor: "green.700",
			boxShadow: `0 0 0 1000px ${darkGreen} inset, 0 0 0 1px ${themeYellow}`,
			transition: "background-color 5000s ease-in-out 0s",
			textFillColor: "#f5f5f5"
		}}
		ref={ref}
		{...props}
	/>
));

export const SnowControlButton = forwardRef<ButtonProps, typeof Button>(
	(props, ref) => (
		<Button
			colorScheme="red"
			size="sm"
			width={8}
			maxHeight={8}
			padding={2}
			border={`2px solid ${themeWhite}`}
			ref={ref}
			{...props}
		/>
	)
);

export const SnowButton = forwardRef<ButtonProps, "div">((props, ref) => (
	<Button
		colorScheme="gray"
		color="red"
		size="sm"
		width={8}
		maxHeight={8}
		ref={ref}
		{...props}
	/>
));

export const SpinnerYellow = forwardRef<SpinnerProps, "div">((props, ref) => (
	<Spinner
		margin="0 auto"
		color="primary.yellow"
		style={{
			position: "fixed",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)"
		}}
		size="xl"
		ref={ref}
		{...props}
	/>
));
