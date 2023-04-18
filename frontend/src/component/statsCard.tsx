import React, { FC, useContext } from "react";
import { useCookies } from "react-cookie";
import { IoIosStats, IoMdClose } from "react-icons/io";
import { BoardContext } from "../App";
import { userStats } from "../util/types";

interface StatProps {
	guessCount: number;
	userStats: userStats;
	stats: boolean;
	showStats: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StatCard: FC<StatProps> = ({
	guessCount,
	userStats,
	showStats,
	stats,
}) => {
	const { login, showLogin } = useContext(BoardContext);
	const [cookie, _] = useCookies(["auth_token"]);
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black/75">
			<div className="h-[650px] w-[525px] rounded-lg bg-[#0e0f10] text-3xl">
				<nav>
					<IoMdClose
						className="float-right mr-4 mt-4 hover:cursor-pointer"
						onClick={() => {
							showStats(!stats);
						}}
					></IoMdClose>
				</nav>
				<div className="mx-20 mt-20 flex flex-col gap-2">
					<p className="text-lg font-bold">Statistics</p>

					<div className="mb-3 flex justify-around gap-10">
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">
								{userStats.played}
							</p>
							<p className="text-xs font-semibold">Played</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">
								{userStats.winPercent.toFixed(0)}
							</p>
							<p className="text-xs font-semibold">Win %</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">
								{userStats.curStreak}
							</p>
							<p className="text-xs font-semibold">
								Current Streak
							</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="text-4xl font-bold">
								{userStats.maxStreak}
							</p>
							<p className="text-xs font-semibold">Max Streak</p>
						</div>
					</div>
					<div>
						<p className="text-lg font-bold">Guess Distribution</p>
					</div>
					<hr></hr>
					{userStats.distribution.map((_, index, userStats) => {
						return (
							<div className="text-base font-bold">
								{index + 1}
								{userStats[index]}
							</div>
						);
					})}
					<hr></hr>
					<div className="flex flex-row items-center py-5 text-base font-normal">
						{cookie.auth_token ? (
							<></>
						) : (
							<>
								<IoIosStats className="h-8 w-8"></IoIosStats>
								<p
									className="underline hover:cursor-pointer"
									onClick={() => {
										showLogin(!login);
										showStats(!stats);
									}}
								>
									Log In or create an account to see your
									stats.
								</p>
							</>
						)}
					</div>

				</div>
			</div>
		</div>
	);
};
