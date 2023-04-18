import { FC, useContext } from "react";
import { BoardContext } from "../App";
import { currentGame } from "../util/types";

interface KeyProp {
	letter: string;
	nonLetter: boolean;
	color: string;
}

export const Key: FC<KeyProp> = ({ letter, nonLetter, color }) => {
	const { board, index, enterKey, backKey, letterKey, curGuess } =
		useContext(BoardContext);
	
	const setLetter = () => {
		if (letter === "Enter") {
			enterKey();
		} else if (letter === "Back") {
			backKey();
		} else {
			letterKey(letter);
		}
	};

	return (
		<div
			className={`${color} m-1 rounded-sm text-lg font-semibold hover:cursor-pointer hover:bg-[#27281B]`}
			onClick={() => {
				setLetter();
			}}
		>
			{!nonLetter ? (
				<div className="flex h-14 w-10 items-center justify-center">
					{letter}
				</div>
			) : (
				<div className="flex h-14 w-16 items-center justify-center">
					{letter}
				</div>
			)}
		</div>
	);
};
