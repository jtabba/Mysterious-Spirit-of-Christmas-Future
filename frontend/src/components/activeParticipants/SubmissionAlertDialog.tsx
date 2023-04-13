import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Input,
	Button,
	Divider
} from "@chakra-ui/react";
import { FC } from "react";
import { useActiveUtils } from "./useActiveUtils";
import { SetEmailMessage } from "./SetEmailMessage";
import { SetBudget } from "./SetBudget";

interface ISubmitAlertDialog {
	isOpen: boolean;
	setClosed: () => void;
}

export const SubmissionAlertDialog: FC<ISubmitAlertDialog> = ({
	isOpen,
	setClosed
}) => {
	const {
		participants: participantsDetails,
		_participantsDetailsService,
		emailMessage,
		budget,
		defaultEmailMessage,
		cancelRef,
		setBudget,
		setEmailMessage
	} = useActiveUtils();

	const postParticipantsDetails = async (): Promise<void> => {
		await _participantsDetailsService
			.postData(
				{
					participantsDetails,
					emailMessage,
					budget
				},
				"participants/send"
			)
			.then((res) => {
				setClosed();
				return res;
			});
	};

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
							<SetBudget budget={budget} setBudget={setBudget} />
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
								onClick={postParticipantsDetails}
								ml={3}
								isDisabled={Number(budget) <= 0}
							>
								Submit
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
