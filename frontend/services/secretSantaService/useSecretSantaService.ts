import SecretSantaService from "./secretSantaService";
import {
	ISecretSantaPostBody,
	ISecretSantaResponse,
	ISecretSantaService
} from "./types";
import { createContext, FC, useContext, useMemo } from "react";
import { PropsWithChildren } from "react";
import { useAxios } from "../fetchData";
import { IParticipantDetails } from "../../src/types";
import { useMutation } from "react-query";
// import auth

interface IUseSecretSantaContext {
	postSecretSantaData: (
		requestBody: ISecretSantaPostBody
	) => Promise<ISecretSantaResponse | null>;
}

const SecretSantaContext = createContext<IUseSecretSantaContext | undefined>(
	undefined
);

const SecretSantaProvider = () => {
	const { fetchData } = useAxios();
	const secretSantaService = new SecretSantaService(fetchData);

	// const postSecretSantaData = async(participantsDetails: IParticipantDetails[], emailMessage: string, budget: string) => {
	//     try {
	//         const requestBody: ISecretSantaPostBody = {
	//             participantsDetails,
	//             emailMessage,
	//             budget
	//         }
	//         const response = secretSantaService.postSecretSantaData(requestBody)

	//         return response
	//     } catch(err) {
	//         console.log(err + "(postSecretSantaData")

	//         return null
	//     }
	// }

	const createSecretSantaDataMutation = useMutation(
		async (requestBody: ISecretSantaPostBody) => {
			return secretSantaService.postSecretSantaData(requestBody);
		},
		{
			onError: (err) => console.log(err),
			onSuccess: (data) => console.log(data)
		}
	);

	const postSecretSantaData = async (requestBody: ISecretSantaPostBody) => {
		return createSecretSantaDataMutation.mutateAsync(requestBody);
	};

	return {
		postSecretSantaData
	};

	// const secretSantaContextValue = useMemo(
	// 	() => ({
	// 		postSecretSantaData
	// 	}),
	// 	[]
	// );

	// return (
	// 	<SecretSantaContext.Provider value={secretSantaContextValue}>
	// 		{children}
	// 	</SecretSantaContext.Provider>
	// );
};

// const useSecretSanta = () => {
// 	const context = useContext(SecretSantaContext);

// 	return context;
// };

export {
	SecretSantaProvider
	// useSecretSanta
};
