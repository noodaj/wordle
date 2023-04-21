import { BoardContext } from "../App";
import { userStats } from "../util/types";
import axios, { AxiosResponse } from "axios";
import { FC, useContext, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { IoMdClose } from "react-icons/io";

interface LoginProps {
	userStats: userStats;
}

interface res {
	token: string;
	userID: string;
}

export const Login: FC<LoginProps> = ({ userStats }) => {
	const { login, showLogin } = useContext(BoardContext);
	const [_, setCookies] = useCookies(["auth_token"]);
	const [newUser, showNewForm] = useState<boolean>(false);
	const [error, setError] = useState<{ error: boolean; message: string }>();
	const userName = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const submitForm = async (e: any) => {
		e.preventDefault();
		if (!newUser) {
			try {
				const res: AxiosResponse<res> = await axios.post(
					"http://localhost:5000/auth/login",
					{
						username: userName.current?.value,
						password: password.current?.value,
					}
				);

				setCookies("auth_token", res.data.token);
				window.localStorage.setItem("userID", res.data.userID);
				showLogin(false);
			} catch (err: any) {
				setError({ error: true, message: err.response.data.message });
			}
		} else {
			try {
				const res: AxiosResponse<res> = await axios.post(
					"http://localhost:5000/auth/register",
					{
						username: userName.current?.value,
						password: password.current?.value,
						curStreak: userStats.curStreak,
						maxStreak: userStats.maxStreak,
						played: userStats.played,
						winPercent: userStats.winPercent,
						wins: userStats.wins,
						distribution: userStats.distribution,
					}
				);

				setCookies("auth_token", res.data.token);
				window.localStorage.setItem("userID", res.data.userID);
				showLogin(false);
			} catch (err: any) {
				setError({ error: true, message: err.response.data.message });
			}
		}
	};

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black/75 text-white">
			<div className="h-[650px] w-[525px] rounded-lg bg-[#0e0f10] text-3xl">
				<nav>
					<IoMdClose
						className="float-right mr-4 mt-4 hover:cursor-pointer"
						onClick={() => {
							showLogin(!login);
						}}
					></IoMdClose>
				</nav>
				{!newUser ? (
					<>
						<div className="mx-20 mt-20 flex flex-col gap-2 text-lg">
							<p className="pb-3 text-center text-2xl font-semibold">
								Log in to your account
							</p>
							<form className="flex flex-col gap-2 text-sm text-white">
								<>
									<p className="font-bold">Username</p>
									<input
										type="text"
										className="loginStyle"
										ref={userName}
									></input>
								</>

								<>
									<p className="font-bold">Password</p>
									<input
										type="password"
										className="loginStyle"
										ref={password}
									></input>
								</>
								<button
									onClick={submitForm}
									className="loginStyle mt-2 bg-[#000000] font-bold hover:bg-[#202324]"
								>
									Login
								</button>
							</form>
							{error && (
								<p className="text-xs text-red-500">
									{error.message}
								</p>
							)}
							<button
								onClick={() => {
									showNewForm(true);
									setError({ error: false, message: "" });
								}}
								className="  mt-3 rounded-sm border-2 border-[#5E6161] bg-[#0e0f10] px-3 py-2 text-sm font-bold hover:bg-[#5E6161]"
							>
								Need an account?
							</button>
						</div>
					</>
				) : (
					<>
						<div className="mx-20 mt-20 flex flex-col gap-2 text-lg">
							<p className="pb-3 text-center text-2xl font-semibold">
								Create an account
							</p>
							<form className="flex flex-col gap-2 text-sm text-white">
								<>
									<p className="font-bold">Username</p>
									<input
										type="text"
										className="loginStyle"
										ref={userName}
									></input>
								</>

								<>
									<p className="font-bold">Password</p>
									<input
										type="password"
										className="loginStyle"
										ref={password}
									></input>
								</>
								<button
									onClick={submitForm}
									className="loginStyle mt-2 bg-[#000000] font-bold hover:bg-[#202324]"
								>
									Create account
								</button>
								{error && (
									<p className="text-xs text-red-500">
										{error.message}
									</p>
								)}
								<button
									onClick={() => showNewForm(false)}
									className="loginStyle mt-2 bg-[#0E0F10] font-bold hover:bg-[#5E6161]"
								>
									Already have an account with us?
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
