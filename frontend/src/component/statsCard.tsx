import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
} from "chart.js";
import React, { FC, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { useCookies } from "react-cookie";
import { IoIosStats, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { BoardContext } from "../App";
import { userStats } from "../util/types";

interface StatProps {
	guessCount: number;
	userStats: userStats;
	stats: boolean;
	showStats: React.Dispatch<React.SetStateAction<boolean>>;
}

ChartJS.register(BarElement, LinearScale, CategoryScale);

export const StatCard: FC<StatProps> = ({
	guessCount,
	userStats,
	showStats,
	stats,
}) => {
	const { login, showLogin } = useContext(BoardContext);
	const [cookie, _] = useCookies(["auth_token"]);

	const options = {
		tooltips: { enabled: false },
		indexAxis: "y" as const,
		scales: {
			x: {
				ticks: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};
	const data = {
		labels: [1, 2, 3, 4, 5, 6],
		datasets: [
			{
				data: userStats.distribution,
				backgroundColor: "rgba(66,113,62)",
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black/75	">
			<motion.div
				initial={{ y: "100vh", opacity: 0, scale: 1 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				exit={{ y: "100vh", opacity: 0, transition: { duration: 0.3 } }}
				className="h-[650px] w-[525px] rounded-lg bg-[#0e0f10] text-3xl"
			>
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
					<Bar options={options} data={data}></Bar>
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
			</motion.div>
		</div>
	);
};
