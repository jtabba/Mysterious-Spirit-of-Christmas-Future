import v1SecretSantaRouter from "./api/v1/routes/secretSantaRoutes";
import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

const PORT: string = process.env.PORT || "8080";
const app: Application = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/secretsanta", v1SecretSantaRouter);

app.listen(PORT, (): void =>
	console.log(`Secret Santa listening on port: ${PORT}`)
);
