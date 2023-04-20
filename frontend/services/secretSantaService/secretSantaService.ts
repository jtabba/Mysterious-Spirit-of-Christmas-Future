import { ENCRYPTION_PASSPHRASE } from "../../src/constants";
import { IParticipantDetails } from "../../src/types";
import { useAxios } from "../fetchData";
import { AxiosResponse } from "axios";
import CryptoJs from "crypto-js";
import {
	EncryptedSecretSantaPostBody,
	SecretSantaApiEndpoints,
	ISecretSantaPostBody
} from "./types";

export const secretSantaService = () => {
	const { fetchData } = useAxios();

	const encryptParticipantsDetails = (
		participantsDetails: IParticipantDetails[]
	) => {
		const encryptedParticipantsDetails = CryptoJs.AES.encrypt(
			JSON.stringify(participantsDetails),
			ENCRYPTION_PASSPHRASE
		).toString();

		return encryptedParticipantsDetails;
	};

	const postSecretSantaData = async (
		requestBody: ISecretSantaPostBody
	): Promise<AxiosResponse | null> => {
		// const encryptedParticipantsDetails: EncryptedSecretSantaPostBody =
		// 	encryptParticipantsDetails(requestBody.participantsDetails);

		const response: AxiosResponse | null = await fetchData(
			SecretSantaApiEndpoints.PostSecretSantas,
			{
				method: "POST",
				body: JSON.stringify({
					...requestBody
					// participantsDetails: encryptedParticipantsDetails
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		return response;
	};

	return {
		postSecretSantaData
	};
};
