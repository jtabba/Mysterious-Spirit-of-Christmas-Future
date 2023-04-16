import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Spinner,
	Button,
	Divider,
	useToast,
	Box
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useActiveUtils } from "./useActiveUtils";
import { SetEmailMessage } from "./SetEmailMessage";
import { SetBudget } from "./SetBudget";

interface ISubmitAlertDialog {
	isOpen: boolean;
	setClosed: () => void;
}

interface IPostParticipantDetailsResponse {
	message: string;
	status: number;
}

export const SubmissionAlertDialog: FC<ISubmitAlertDialog> = ({
	isOpen,
	setClosed
}) => {
	const {
		participants: participantsDetails,
		emailMessage,
		budget,
		defaultEmailMessage,
		cancelRef,
		setBudget,
		postSecretSantaData,
		setEmailMessage
	} = useActiveUtils();
	const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(false);
	const responseNotification = useToast();
	const triggerResponseNotification = (
		response: IPostParticipantDetailsResponse
	) => {
		const { message, status } = response;

		return responseNotification({
			position: "top-right",
			render: () => (
				<Box
					color="white"
					p={3}
					bg={status === 200 ? "green" : "red"}
					border="1px solid white"
				>
					{message}
				</Box>
			)
		});
	};

	const postParticipantsDetails = async (event: any): Promise<void> => {
		event.preventDefault();
		setIsSpinnerActive(true);

		const response = await postSecretSantaData({
			participantsDetails,
			emailMessage,
			budget
		});
		console.log("Done");
		console.log(response);
	};

	useEffect(() => {
		// Yes, I am using a fake timeout for the spinner. All for UX!
		if (isSpinnerActive) {
			const randomTimeout: number =
				Math.floor(Math.random() * 1500) + 1000;

			const submissionTimeout = setTimeout(() => {
				setIsSpinnerActive(false);
				setClosed();
				triggerResponseNotification({
					message: "Success!",
					status: 400
				});
			}, randomTimeout);

			return () => {
				clearTimeout(submissionTimeout);
			};
		}
	}, [isSpinnerActive]);

	return (
		<>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				closeOnEsc={true}
				closeOnOverlayClick={true}
				isCentered={true}
				onClose={setClosed}
				returnFocusOnClose={true}
			>
				<AlertDialogOverlay>
					{isSpinnerActive ? (
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
						/>
					) : (
						<AlertDialogContent maxWidth="62rem" maxHeight="38rem">
							<AlertDialogHeader
								alignItems="center"
								fontSize="3xl"
								fontWeight="bold"
							>
								Finalise your submission!
							</AlertDialogHeader>

							<Divider colorScheme="grey.800" />

							<AlertDialogBody
								rowGap="20px"
								display="flex"
								flexDirection="column"
								justifyContent="space-between"
								overflow="scroll"
							>
								<SetBudget
									budget={budget}
									setBudget={setBudget}
								/>
								<Divider colorScheme="grey.800" />
								<SetEmailMessage
									budget={budget}
									emailMessage={emailMessage}
									setEmailMessage={setEmailMessage}
									defaultEmailMessage={defaultEmailMessage}
								/>
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button
									ref={cancelRef}
									colorScheme="red"
									onClick={setClosed}
								>
									Cancel
								</Button>
								<Button
									colorScheme="green"
									onClick={(e) => postParticipantsDetails(e)}
									ml={3}
									isDisabled={Number(budget) <= 0}
								>
									Submit
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					)}
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
