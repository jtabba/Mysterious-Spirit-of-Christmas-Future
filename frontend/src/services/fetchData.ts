import { ISecretSantaRequest } from "./secretSantaService/types";
import { API_URL } from "../constants";
import axios from "axios";

axios.defaults.baseURL = API_URL;

export const useAxios = () => {
	async function fetchData<T>(
		endpoint: string,
		options: ISecretSantaRequest
	): Promise<T> {
		return axios({
			method: options.method ?? "POST",
			data: options.body,
			url: endpoint,
			headers: {
				...options.headers
			},
			timeout: 0
		});
	}

	return {
		fetchData
	};
};
