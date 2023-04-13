import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

// export const transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		type: "OAuth2",
// 		user: process.env.USER,
// 		pass: process.env.PASSWORD,
// 		clientId: process.env.CLIENT_ID,
// 		clientSecret: process.env.CLIENT_SECRET,
// 		refreshToken: process.env.REFRESH_TOKEN
// 	}
// });
