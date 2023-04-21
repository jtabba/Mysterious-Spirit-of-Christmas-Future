import { useNotification } from "../../src/components/activeParticipants/dialogOverlay/useNotification";
import { useActiveUtils } from "../../src/components/activeParticipants/utils/useActiveUtils";
import { secretSantaService } from "./secretSantaService";
import { ISecretSantaPostBody } from "./types";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

const useSecretSantaService = () => {
	const { postSecretSantaData } = secretSantaService();
	const { setIsLoading, setClosed, setParticipantsDetails } =
		useActiveUtils();
	const { renderNotification } = useNotification();

	const createSecretSantaDataMutation = useMutation(
		async (requestBody: ISecretSantaPostBody) => {
			setIsLoading(true);

			return postSecretSantaData(requestBody);
		},
		{
			onSuccess: (response: any) => {
				setIsLoading(false);
				setClosed();
				setParticipantsDetails([]);

				renderNotification(response.data);
			},
			onError: (error: any) => {
				setIsLoading(false);
				setClosed();

				if (error instanceof AxiosError) {
					renderNotification(error.response!.data);
				} else {
					renderNotification({
						message:
							"An unexpected error has occured - please try again",
						status: 400
					});
				}

				throw new Error(error);
			}
		}
	);

	const postParticipantsDetails = async (requestBody: ISecretSantaPostBody) =>
		createSecretSantaDataMutation.mutateAsync(requestBody);

	return {
		postParticipantsDetails
	};
};

export { useSecretSantaService };
