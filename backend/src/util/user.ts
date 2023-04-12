import { model, Schema } from "mongoose";
import { IUser } from "../util/types.server";

const UserSchema: Schema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	wins: { type: Number, default: 0 },
	curStreak: { type: Number, default: 0 },
	maxStreak: { type: Number, default: 0 },
	winPercent: { type: Number, default: 0 },
	played: { type: Number, default: 0 },
	distribution: {type: [Number], default: []}
});

const UserModel = model<IUser>("users", UserSchema);
export default UserModel;
