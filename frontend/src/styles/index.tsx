import {
	forwardRef,
	Container,
	ContainerProps,
	Divider,
	Text
	// ComponentStyleConfig,
	// SystemStyleFunction
} from "@chakra-ui/react";

export const DividerYellow = () => (
	<Divider borderColor="primary.yellow" borderBottomWidth={2} />
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
			border="4px solid #E6BC00"
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

// export const MainBodyContainer: SystemStyleFunction = () => {
// 	return {
// 		width: "32rem",
// 		display: "flex",
// 		flexDirection: "column",
// 		gap: "1rem"
// 	};
// };

// export const MainBodySegment = () => (
// 	<Container width="32rem" display="flex" flexDirection="column" gap="1rem" />
// );
