import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IUser, IUserData } from "../util/types.server";
import UserModel from "../util/user";
//router for updating user data
const router = express.Router();
router.patch("/updateData", async (req: Request, res: Response) => {
	//destructure
	const {
		userID,
		stats: { curStreak, maxStreak, played, winPercent, wins, distribution },
	} = req.body[0] as IUserData;

	//try finding user and updating
	//if user not found send error message
	try {
		await UserModel.findOneAndUpdate(
			{ _id: userID },
			{
				$set: {
					curStreak,
					maxStreak,
					played,
					winPercent,
					wins,
					distribution,
				},
			}
		);

		return res.status(200).json({
			message: "Success",
		});
	} catch (err) {
		return res
			.status(400)
			.json({ message: "An error occured when updating" });
	}
});

router.get("/getData", async (req: Request, res: Response) => {
	//destructure
	const { userID } = req.query;

	try {
		const response = await UserModel.findById({ _id: userID });

		return res.status(200).json({
			wins: response.wins,
			curStreak: response.curStreak,
			maxStreak: response.maxStreak,
			winPercent: response.winPercent,
			played: response.played,
			distribution: response.distribution,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "userID not found", err });
	}
});

export { router as userRouter };

//create user function
export const createUser = async ({
	username,
	password,
	curStreak,
	maxStreak,
	played,
	winPercent,
	wins,
	distribution,
}: IUser) => {
	//hash password
	const hashed = await bcrypt.hash(password, 10);

	//wait for new user to be created
	//might be wrong
	const newUser: HydratedDocument<IUser> = new UserModel({
		username,
		password: hashed,
		curStreak,
		maxStreak,
		played,
		winPercent,
		wins,
		distribution,
	});

	//return the user id
	const user = await newUser.save();
	return { user: { id: user._id } };
};
