import { IParticipantDetails } from "./types";
import { create } from "zustand";

interface ISecretSantaStore {
	snowRate: number;
	participantsDetails: IParticipantDetails[];
	setSnowRate: (value: number) => void;
	setParticipantsDetails: (newParticipants: IParticipantDetails[]) => void;
}

export const useSecretSantaStore = create<ISecretSantaStore>((set) => ({
	snowRate: 100,
	participantsDetails: [],
	setSnowRate: (value: number) => set(() => ({ snowRate: value })),
	setParticipantsDetails: (newParticipantsDetails: IParticipantDetails[]) =>
		set(() => ({ participantsDetails: newParticipantsDetails }))
}));
