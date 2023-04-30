import rateLimiter from "express-rate-limit";

export const secretSantaLimiter = rateLimiter({
	max: 3,
	windowMs: 60000,
	standardHeaders: false,
	message: {
		status: 429,
		message:
			"Santa can't take anymore requests at the moment - Please try again in a few minutes",
		type: "error"
	}
});
