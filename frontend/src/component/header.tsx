import { FC, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { InfoModal } from "./infoModal";

export const Header: FC = () => {
	const [infoState, setInfoState] = useState<boolean>(false);

	return (
		<>
			<div className="flex items-center justify-between mx-5 font-semibold text-3xl mb-3">
				<GiHamburgerMenu></GiHamburgerMenu>
				<div className="ml-16">Wordle</div>
				<div className="flex gap-x-2">
					<> {infoState && <InfoModal modalState={infoState} setModal= {setInfoState}></InfoModal>}</>
					<AiOutlineQuestionCircle
						className="hover:cursor-pointer"
						onClick={() => {
							setInfoState(!infoState);
						}}
					></AiOutlineQuestionCircle>
					<IoStatsChart className="hover:cursor-pointer"></IoStatsChart>
					<IoSettingsSharp className="hover:cursor-pointer"></IoSettingsSharp>
				</div>
			</div>
			<hr className="min-w-max">test</hr>
		</>
	);
};
