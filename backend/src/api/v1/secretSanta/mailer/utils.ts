import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const generateMailOptions = (
	giftReceiverssName: string,
	giftGiversEmail: string,
	giftGiversName: string,
	emailMessage: string,
	budget: string,
	currentYear: number
) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to: giftGiversEmail,
		subject: `Your ${currentYear} Secret Santa!`,
		text: `
Hi ${giftGiversName!.split(" ")[0]},


You have been chosen as ${giftReceiverssName}'s Secret Santa! The budget for this year is $${budget}. 

${emailMessage}


Merry Christmas,
Mysterious Spirit of Christmas Future,
`
	};

	return mailOptions;
};

export const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		type: "login",
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
} as SMTPTransport.Options);
