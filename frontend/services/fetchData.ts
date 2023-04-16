import axios, { AxiosPromise, AxiosResponse } from "axios";
import { API_URL } from "../src/constants";
import { ISecretSantaRequest } from "./secretSantaService/types";

axios.defaults.baseURL = API_URL;

let authTokenRequest: Promise<any> | null;

async function handleRequest<T>(
	handler: () => AxiosPromise<T>,
	onUnauthorised: () => Promise<void>
) {
	return handler().catch(async (error) => {
		if (error.response && error.response.status === 401) {
			if (!authTokenRequest) {
				authTokenRequest = onUnauthorised();
			}

			const retry = authTokenRequest?.then(handler).catch((err) => {
				throw err;
			});

			authTokenRequest = retry;
			let response = await retry;
			authTokenRequest = null;
			return response;
		}

		throw error;
	});
}

export const useAxios = () => {
	async function fetchData<T>(
		endpoint: string,
		options: ISecretSantaRequest
	): Promise<T> {
		const response: any = await handleRequest<AxiosResponse>(
			() => {
				return axios({
					method: options.method ?? "POST",
					data: options.body,
					url: endpoint,
					headers: {
						...options.headers
						// Authorization: ""
					},
					timeout: 0
				});
			},
			() => response
		);
		return response.data as unknown as T;
	}

	return {
		fetchData
	};
};
