import express, { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "../util/user";
import { IUser, IUserData } from "../util/types.server";

//router for updating user data
const router = express.Router();
router.patch("/updateData", async (req: Request, res: Response) => {
	//destructure
	const { userID, curStreak, maxStreak, played, winPercent, wins } =
		req.body as IUserData;

	//try finding user and updating
	//if user not found send error message
	try {
		await UserModel.findOneAndUpdate(
			{ _id: userID },
			{ $set: { curStreak, maxStreak, played, winPercent, wins } }
		);

		return res.status(200).json({ message: "Success" });
	} catch (err) {
		return res
			.status(400)
			.json({ message: "An error occured when updating" });
	}
});
export { router as userRouter };

export const createUser = async ({
	username,
	password,
	curStreak,
	maxStreak,
	played,
	winPercent,
	wins,
}: IUser) => {
	const hashed = await bcrypt.hash(password, 10);
	const newUser: HydratedDocument<IUser> = new UserModel({
		username,
		password: hashed,
		curStreak,
		maxStreak,
		played,
		winPercent,
		wins,
	});
	const user = await newUser.save();
	return { user: { id: user._id } };
};
