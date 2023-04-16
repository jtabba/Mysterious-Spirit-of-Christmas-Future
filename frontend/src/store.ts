import { IParticipantDetails } from "./types";
import { create } from "zustand";

interface ISecretSantaStore {
	participants: IParticipantDetails[];
	snowRate: number;
	setParticipants: (participants: IParticipantDetails[]) => void;
	setSnowRate: (value: number) => void;
}

export const useSecretSantaStore = create<ISecretSantaStore>((set) => ({
	participants: [],
	snowRate: 0, // change
	setParticipants: (participants: IParticipantDetails[]) =>
		set(() => ({ participants })),
	setSnowRate: (value: number) => set(() => ({ snowRate: value }))
}));
