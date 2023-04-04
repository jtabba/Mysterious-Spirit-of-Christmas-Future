// config
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
const fs = require("fs");
// account
const service = "gmail";
const type = "OAuth2";
const user = "";
const password = "";
const clientId = "";
const clientSecret = "";
const refreshToken = "";

const transporter = nodemailer.createTransport({
	service: service,
	auth: {
		type: type,
		user: user,
		pass: password,
		clientId: clientId,
		clientSecret: clientSecret,
		refreshToken: refreshToken
	}
});

// variables
const giftFromEmails = {};
const giftFrom = Object.keys(giftFromEmails);
const giftTo = [];
const giftPairs = {};

app.listen(() =>
	console.log(`Secret Santa Node Mailer listening on port: ${port}`)
);

for (let i = 0; i < giftFrom.length; i++) {
	let assigned = false;

	while (!assigned) {
		let giftToIndex = Math.floor(Math.random() * giftTo.length);

		if (giftTo[giftToIndex] != giftFrom[i]) {
			giftPairs[giftFrom[i]] = giftTo[giftToIndex];
			assigned = true;
			giftTo.splice(giftToIndex, 1);
		}
	}

	let mailOptions = {
		from: user,
		to: giftFromEmails[giftFrom[i]],
		subject: "",
		text: ``
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log("Error " + err);
		} else {
			console.log(
				"Email sent successfully to " + giftFromEmails[giftFrom[i]]
			);
		}
	});
}

console.log("All Secret Santa's sent!");
