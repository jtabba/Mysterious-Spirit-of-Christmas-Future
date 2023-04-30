import { RawAxiosRequestHeaders, Method } from "axios";
import { IParticipantDetails } from "../../types";

export interface ISecretSantaPostBody {
	participantsDetails: IParticipantDetails[];
	emailMessage: string;
	budget: string;
}

export type EncryptedSecretSantaPostBody = string;

export interface ISecretSantaRequest {
	method?: Method;
	body?: string;
	headers?: RawAxiosRequestHeaders;
}

export interface ISecretSantaResponse {
	status: number;
	message: string;
}
