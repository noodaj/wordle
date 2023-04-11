import cors from "cors";
import fetch from "node-fetch";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.server";
import { userRouter } from "./routes/user.server";
import { wordRouter } from "./routes/word.server";

dotenv.config();
const app = express();

const getWordSet = async () => {
	let wordSet: Set<string>;
	await fetch(
		"https://raw.githubusercontent.com/tabatkins/wordle-list/main/words"
	)
		.then((res) => res.text())
		.then((res) => {
			const words = res.split("\n");
			wordSet = new Set(words);
		});

	return wordSet;
};

const index = 20;
const wordSet = await getWordSet();

app.locals.words = wordSet;
app.locals.dailyWord = [...wordSet][index];

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/words", wordRouter);

app.listen(process.env.PORT, () => {
	console.log("Server is running");
});
