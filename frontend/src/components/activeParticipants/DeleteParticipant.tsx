import { Button, ButtonGroup } from "@chakra-ui/react";
import { IParticipantDetails } from "../../types";
import { themeWhite } from "../../theme/theme";
import { DeleteIcon } from "@chakra-ui/icons";
import { FC, useState } from "react";

interface IDeleteParticipant {
	participants: IParticipantDetails[];
	participantId: string | undefined;
	setParticipants: (participants: IParticipantDetails[]) => void;
}

export const DeleteParticipant: FC<IDeleteParticipant> = ({
	participants,
	participantId,
	setParticipants
}) => {
	const [deleteActive, setDeleteActive] = useState<boolean>(false);
	const handleDelete = () => {
		const filteredParticipants: IParticipantDetails[] = participants.filter(
			({ id }) => id != participantId
		);

		setParticipants(filteredParticipants);
		setDeleteActive(!deleteActive);
	};

	return (
		<>
			{deleteActive ? (
				<ButtonGroup size="xs">
					<Button
						colorScheme="red"
						border={`1px solid ${themeWhite}`}
						onClick={handleDelete}
					>
						Delete
					</Button>
					<Button
						colorScheme="green"
						border={`1px solid ${themeWhite}`}
						onClick={() => setDeleteActive(!deleteActive)}
					>
						Cancel
					</Button>
				</ButtonGroup>
			) : (
				<DeleteIcon
					color="primary.yellow"
					aria-label="Delete icon"
					_hover={{ color: "red", cursor: "pointer" }}
					onClick={() => setDeleteActive(!deleteActive)}
				/>
			)}
		</>
	);
};
