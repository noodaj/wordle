import { motion } from "framer-motion";
import React, { FC, useContext } from "react";
import { useCookies } from "react-cookie";
import { IoMdClose } from "react-icons/io";
import { BoardContext } from "../App";
import { boardGrid } from "../util/board";
import { currentGame, userStats } from "../util/types";

interface props {
	sidePanel: boolean;
	login: boolean;
	curGuess: React.MutableRefObject<string | null>
	setUserStats: React.MutableRefObject<userStats | null>
	showSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
	showLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidePanel: FC<props> = ({ showSidePanel, showLogin, curGuess, setUserStats }) => {
	const { setBoard, setIndex } = useContext(BoardContext);
	const [cookie] = useCookies(["auth_token"]);

	const handleLogout = () => {
		delete_cookie("auth_token");
		window.localStorage.removeItem("userID");

		const gameStats = window.localStorage.getItem("currentGame") as string;
		const userStats = window.localStorage.getItem("userStats") as string;
		const game: currentGame = JSON.parse(gameStats);
		const stats: userStats = JSON.parse(userStats);

		if (!game) {
			setBoard(boardGrid);
		} else {
			setBoard(() => { return game.board});
			setIndex(game.index);
			curGuess.current = game.guess;
		}
		if (!stats) {
			setUserStats.current = stats;
		}
	};

	function delete_cookie(name: string) {
		document.cookie =
			name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}

	return (
		<motion.div
			initial={{ x: -100 }}
			animate={{ x: 0, transition: { type: "tween", duration: 0.1 } }}
			exit={{ x: -500, transition: { ease: "easeOut" } }}
			className="absolute z-20 h-[867px] w-96 border border-[#837A6C] bg-[#0e0f10] hover:cursor-pointer"
			onClick={() => {
				showSidePanel(!SidePanel);
			}}
		>
			<nav>
				<IoMdClose
					className="float-right mr-4 mt-4 text-3xl hover:cursor-pointer"
					onClick={() => {
						showSidePanel(!SidePanel);
					}}
				></IoMdClose>
			</nav>
			<div className="absolute bottom-0 left-0 right-0 m-auto flex items-end justify-center">
				{cookie.auth_token ? (
					<button
						className="mb-3 h-10 w-80 rounded border border-[#303436]"
						onClick={handleLogout}
					>
						Logout
					</button>
				) : (
					<button
						className="mb-3 h-10 w-80 rounded border border-[#303436]"
						onClick={() => {
							showLogin(true);
						}}
					>
						Log In
					</button>
				)}
			</div>
		</motion.div>
	);
};
