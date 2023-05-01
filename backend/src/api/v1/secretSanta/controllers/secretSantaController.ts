import SecretSantaService from "../services/secretSantaService";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const secretSantaService = new SecretSantaService();

class SecretSantaController {
	createAndSendEmail(req: Request, res: Response) {
		try {
			const response = secretSantaService.createSecretSantaInstance(
				req.socket.remoteAddress!,
				req.body
			);

			res.send(response);
		} catch (err: Error | unknown) {
			res.send({
				status: 400,
				message: err
			});

			throw new Error(`Failed to send details: ${err}`);
		}
	}

	getBlacklistedIps(req: Request, res: Response) {
		try {
			const response = secretSantaService.getBlacklistedIps(
				req.headers.password as string
			);

			res.send(response);
		} catch (err: Error | unknown) {
			res.send({
				status: 400,
				message: err
			});

			throw new Error(`Failed to get blacklisted IPs: ${err}`);
		}
	}
	// refactor
	removeBlacklistedIp(req: Request, res: Response) {
		try {
			const response = secretSantaService.removeBlacklistedIp(
				req.headers.password as string,
				req.body.ip.toString()
			);

			res.send(response);
		} catch (err: Error | unknown) {
			res.send({
				status: 400,
				message: err
			});

			throw new Error(`Failed to unban IP: ${err}`);
		}
	}
}

export default SecretSantaController;
