import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { IParticipantDetails } from "../../types";

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
				<HStack>
					<Button colorScheme="red" size="xs" onClick={handleDelete}>
						Delete
					</Button>
					<Button
						colorScheme="green"
						size="xs"
						onClick={() => setDeleteActive(!deleteActive)}
					>
						Cancel
					</Button>
				</HStack>
			) : (
				<DeleteIcon
					aria-label="Delete icon"
					_hover={{ color: "red", cursor: "pointer" }}
					onClick={() => setDeleteActive(!deleteActive)}
				/>
			)}
		</>
	);
};
