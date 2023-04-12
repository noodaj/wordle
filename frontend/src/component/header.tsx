import React, { Dispatch, FC, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { InfoModal } from "./infoModal";

interface HeaderProps {
	stats: boolean;
	showStats: Dispatch<React.SetStateAction<boolean>>;
	login: boolean;
	showLogin: Dispatch<React.SetStateAction<boolean>>;
}
export const Header: FC<HeaderProps> = ({
	showStats,
	stats,
	login,
	showLogin,
}) => {
	const [infoState, setInfoState] = useState<boolean>(false);

	return (
		<>
			<div className="flex items-center justify-between mx-5 font-semibold text-3xl mb-3">
				<GiHamburgerMenu></GiHamburgerMenu>
				<div className="ml-20">Wordle</div>
				<div className="flex gap-x-2">
					<>
						{infoState && (
							<InfoModal
								modalState={infoState}
								setModal={setInfoState}
								login={login}
								showLogin={showLogin}
							></InfoModal>
						)}
					</>
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
