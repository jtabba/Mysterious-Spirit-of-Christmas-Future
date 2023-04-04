import { IParticipantDetails } from "./components/inputParticipants/types";
import { create } from "zustand";

interface ISecretSantaStore {
	participants: IParticipantDetails[];
	setParticipants: (participants: IParticipantDetails[]) => void;
}

export const useSecretSantaStore = create<ISecretSantaStore>((set) => ({
	participants: [],
	setParticipants: (participants: IParticipantDetails[]) =>
		set(() => ({ participants }))
}));
