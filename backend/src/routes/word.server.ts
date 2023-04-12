import express, { Request, Response } from "express";
import { word } from "../util/types.server";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	const dailyWord = req.app.locals.dailyWord;

	res.status(200).json({ daily: dailyWord });
});

router.post("/checkWord", (req: Request, res: Response) => {
	const { word } = req.body as word;
	const wordSet: Set<string> = req.app.locals.words;

	console.log(word);
	if (!wordSet.has(word)) {
		console.log("invalid word");
		return res.status(400).json({ error: "Invalid word" });
	}

	return res.status(200).json({});
});

export { router as wordRouter };
