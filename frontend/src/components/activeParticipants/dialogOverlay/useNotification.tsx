import { useToast, Box } from "@chakra-ui/react";

interface IPostParticipantDetailsResponse {
	message: string;
	status: number;
}

export const useNotification = () => {
	const responseNotification = useToast();

	const renderNotification = (
		postResponse: IPostParticipantDetailsResponse
	) => {
		const { message, status } = postResponse;

		return responseNotification({
			position: "top-right",
			isClosable: true,
			duration: 6000,
			render: () => (
				<Box
					color="white"
					p={3}
					borderRadius={10}
					bg={status === 200 ? "green" : "red"}
					border="2px solid white"
					display="flex"
					justifyContent="center"
				>
					{message}
				</Box>
			)
		});
	};

	return {
		renderNotification
	};
};
