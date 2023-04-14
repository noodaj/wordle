import React, { FC } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSettingsSharp, IoStatsChart } from "react-icons/io5";

interface HeaderProps {
	stats: boolean;
	infoState: boolean;
	showStats: React.Dispatch<React.SetStateAction<boolean>>;
	setInfoState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({
	showStats,
	stats,
	setInfoState,
	infoState,
}) => {
	return (
		<>
			<div className="mx-5 mb-3 flex items-center justify-between text-3xl font-semibold">
				<GiHamburgerMenu></GiHamburgerMenu>
				<div className="ml-20">Wordle</div>
				<div className="flex gap-x-2">
					<AiOutlineQuestionCircle
						className="hover:cursor-pointer"
						onClick={() => {
							setInfoState(!infoState);
						}}
					></AiOutlineQuestionCircle>
					<IoStatsChart
						className="hover:cursor-pointer"
						onClick={() => {
							showStats(!stats);
						}}
					></IoStatsChart>
					<IoSettingsSharp className="hover:cursor-pointer"></IoSettingsSharp>
				</div>
			</div>
			<hr></hr>
		</>
	);
};
