import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.server";
import { userRouter } from "./routes/user.server";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.listen(process.env.PORT, () => {
	console.log("Server is running");
});
