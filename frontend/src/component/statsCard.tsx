import React, { FC } from "react";
import { IoIosStats, IoMdClose } from "react-icons/io";

interface StatProps {
	guessCount: number; //should be number array
	played: number;
	wins: number;
	curStreak: number;
	maxStreak: number;
	stats: boolean;
	showStats: React.Dispatch<React.SetStateAction<boolean>>;
	login: boolean;
	showLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export const StatCard: FC<StatProps> = ({
	guessCount,
	curStreak,
	maxStreak,
	played,
	wins,
	showStats,
	stats,
	login,
	showLogin,
}) => {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black/75">
			<div className="w-[525px] h-[650px] rounded-lg bg-[#0e0f10]">
				<nav>
					<IoMdClose
						className="float-right mr-4 mt-4 hover:cursor-pointer"
						onClick={() => {
							showStats(!stats);
						}}
					></IoMdClose>
				</nav>
				<div className="flex flex-col gap-2 mx-20 mt-20">
					<p className="font-bold text-lg">Statistics</p>

					<div className="flex gap-10 justify-around mb-3">
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">{played}</p>
							<p className="text-xs font-semibold">Played</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">{wins}</p>
							<p className="text-xs font-semibold">Win %</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">{curStreak}</p>
							<p className="text-xs font-semibold">
								Current Streak
							</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">{maxStreak}</p>
							<p className="text-xs font-semibold">Max Streak</p>
						</div>
					</div>
					<div>
						<p className="text-lg font-bold">Guess Distribution</p>
					</div>
					<hr></hr>
					<div className="flex flex-row items-center py-5 text-base font-normal">
						<IoIosStats className="h-8 w-8"></IoIosStats>
						<p
							className="underline hover:cursor-pointer"
							onClick={() => {
								showLogin(!login);
								showStats(!stats);
							}}
						>
							Log In or create an account to see your stats.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
