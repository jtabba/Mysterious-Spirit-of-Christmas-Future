import { EncryptedSecretSantaPostBody, ISecretSantaPostBody } from "./types";
import { ENCRYPTION_PASSPHRASE } from "../../constants";
import { SecretSantaApiEndpoints } from "./endpoints";
import { IParticipantDetails } from "../../types";
import { useAxios } from "../fetchData";
import { AxiosResponse } from "axios";
import CryptoJs from "crypto-js";

const encryptParticipantsDetails = (
	participantsDetails: IParticipantDetails[]
) => {
	const encryptedParticipantsDetails = CryptoJs.AES.encrypt(
		JSON.stringify(participantsDetails),
		ENCRYPTION_PASSPHRASE
	).toString();

	return encryptedParticipantsDetails;
};

export const secretSantaService = () => {
	const { fetchData } = useAxios();

	const postSecretSantaData = async (
		requestBody: ISecretSantaPostBody
	): Promise<AxiosResponse | null> => {
		const encryptedParticipantsDetails: EncryptedSecretSantaPostBody =
			encryptParticipantsDetails(requestBody.participantsDetails);

		const response: AxiosResponse | null = await fetchData(
			SecretSantaApiEndpoints.SendSecretSantas,
			{
				method: "POST",
				body: JSON.stringify({
					...requestBody,
					participantsDetails: encryptedParticipantsDetails
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
