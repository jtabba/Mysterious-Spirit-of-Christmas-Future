import {
	ISecretSantaPostBody,
	ISecretSantaRequest,
	ISecretSantaService,
	ISecretSantaResponse,
	SecretSantaApiEndpoints
} from "./types";

class SecretSantaService implements ISecretSantaService {
	fetchData: <T>(
		endpoint: string,
		options: ISecretSantaRequest
	) => Promise<T>;

	constructor(
		fetchData: <T>(
			endpoint: string,
			options: ISecretSantaRequest
		) => Promise<T>
	) {
		this.fetchData = fetchData;
	}

	private async postRequest<T = unknown>(
		endpoint: string,
		body: object
		// options: object = {} // use when JWT added
	) {
		return this.fetchData<T>(endpoint, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
			// ...options
		});
	}

	async postSecretSantaData(
		requestBody: ISecretSantaPostBody
	): Promise<ISecretSantaResponse | null> {
		try {
			const response: ISecretSantaResponse =
				await this.postRequest<ISecretSantaResponse>(
					SecretSantaApiEndpoints.PostSecretSantas,
					{ ...requestBody }
				);

			return response ?? null;
		} catch (error) {
			throw new Error("Failed to post participants' details");
		}
	}
}

export default SecretSantaService;
