import participantsRouter from "./routes/participantsRouter";
import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { generateSecretSantaPairs } from "./mailer";

const PORT: string = process.env.PORT || "3001";
const app: Application = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/participants", participantsRouter);

app.listen(PORT, (): void =>
	console.log(`Secret Santa listening on port: ${PORT}`)
);
