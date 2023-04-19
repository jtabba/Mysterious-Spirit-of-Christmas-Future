import { useSecretSantaService } from "../../../../services/secretSantaService/useSecretSantaService";
import { useActiveUtils } from "../utils/useActiveUtils";
import { SetEmailMessage } from "../SetEmailMessage";
import { SpinnerYellow } from "../../../styles";
import { SetBudget } from "../SetBudget";
import { FC } from "react";
import {
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialog,
	Divider,
	Button
} from "@chakra-ui/react";

export interface ISubmissionAlertDialog {
	isOpen: boolean;
	setClosed: () => void;
}

export const SubmissionAlertDialog: FC<ISubmissionAlertDialog> = ({
	isOpen,
	setClosed
}) => {
	const {
		defaultEmailMessage,
		participantsDetails,
		emailMessage,
		isLoading,
		cancelRef,
		budget,
		setBudget,
		setEmailMessage
	} = useActiveUtils();
	const { postParticipantsDetails } = useSecretSantaService();

	return (
		<AlertDialog
			isOpen={isOpen}
			closeOnEsc={true}
			isCentered={true}
			onClose={setClosed}
			returnFocusOnClose={true}
			closeOnOverlayClick={true}
			leastDestructiveRef={cancelRef}
		>
			<AlertDialogOverlay>
				{isLoading ? (
					<SpinnerYellow />
				) : (
					<AlertDialogContent maxWidth="62rem" maxHeight="38rem">
						<AlertDialogHeader
							fontSize="3xl"
							fontWeight="bold"
							alignItems="center"
						>
							Finalise your submission!
						</AlertDialogHeader>
						<Divider />

						<AlertDialogBody
							rowGap="20px"
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							overflow="scroll"
						>
							<SetBudget budget={budget} setBudget={setBudget} />

							<Divider />

							<SetEmailMessage
								budget={budget}
								emailMessage={emailMessage}
								setEmailMessage={setEmailMessage}
								defaultEmailMessage={defaultEmailMessage}
							/>

							<Divider />
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
								onClick={(event) => {
									event.preventDefault();

									postParticipantsDetails({
										participantsDetails,
										emailMessage,
										budget
									});
								}}
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
	);
};
