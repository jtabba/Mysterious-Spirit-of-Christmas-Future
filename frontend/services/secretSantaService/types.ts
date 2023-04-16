import { RawAxiosRequestHeaders, Method } from "axios";
import { IParticipantDetails } from "../../src/types";

export interface ISecretSantaPostBody {
	participantsDetails: IParticipantDetails[];
	emailMessage: string;
	budget: string;
}

export enum SecretSantaApiEndpoints {
	// create = "creat",
	PostSecretSantas = "/participants/send"
	// update = "update",
	// delete = "delete"
}

export interface ISecretSantaRequest {
	method?: Method;
	body?: string;
	headers?: RawAxiosRequestHeaders;
}

export interface ISecretSantaResponse {
	status: number;
	message: string;
}

export interface ISecretSantaService {
	postSecretSantaData: (
		requestBody: ISecretSantaPostBody
	) => Promise<ISecretSantaResponse | null>;
}
