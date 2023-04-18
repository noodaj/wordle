import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../util/user";
import { createUser } from "./user.server";
import { IUser } from "../util/types.server";
import { validPassword, validUsername } from "./validate.server";

const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
	const {
		username,
		password,
		curStreak,
		maxStreak,
		played,
		winPercent,
		wins,
		distribution,
	} = req.body as IUser;

	//checking for valid username
	if (validUsername(username) != undefined) {
		return res.status(400).json({ message: "Please enter valid username" });
	}

	//look through database to find user
	const user = await UserModel.findOne({ username });
	if (user) {
		return res.json({ message: "User already exists." });
	}

	//checking for invalid password
	if (validPassword(password) != undefined) {
		return res
			.status(400)
			.json({ message: "Please enter a valid password." });
	}
	
	//create the new user from req.body
	const newUser = await createUser({
		username,
		password,
		curStreak,
		maxStreak,
		played,
		winPercent,
		wins,
		distribution,
	});

	//error creating the user
	if (!newUser) {
		return res
			.status(400)
			.json({ message: "There was an error creating a new user" });
	}

	//sign user that just created account
	const token = jwt.sign({ id: newUser }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	return res.json({ userID: newUser.user.id, token });
});

router.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body as IUser;

	//check for valid user and password
	if (
		validUsername(username) != undefined ||
		validPassword(password) != undefined
	) {
		return res
			.status(400)
			.json({ message: "One or more of the fields are invalid" });
	}

	//find user
	const user = await UserModel.findOne({ username });

	//if not user or password send error msg
	if (!user || !bcrypt.compare(password, user.password)) {
		return res
			.status(400)
			.json({ message: "Invalid username or password" });
	}

	//sign jwt token
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	res.json({ token, userID: user._id });
});

export { router as authRouter };
