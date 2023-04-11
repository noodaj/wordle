import express, { Request, Response } from "express";
import { word } from "../util/types.server";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	const dailyWord = req.app.locals.dailyWord.toUpperCase();

	res.status(200).json({ daily: dailyWord });
});

router.post("/checkWord", (req: Request, res: Response) => {
	const { word } = req.body as word;
	const wordSet: Set<string> = req.app.locals.words;
	const validWord = req.app.locals.dailyWord;

	if (!wordSet.has(word)) {
        console.log("invalid word")
		return res.status(400).json({ message: "Invalid word" });
	}

	if (word === validWord) {
        console.log("correct word")
		return res.status(200).json({ message: "Correct guess" });
	}

    console.log("wrong word")
	return res.status(400).json({ message: "Wrong word" });
});

export { router as wordRouter };
