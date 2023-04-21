import { FC, useContext } from "react";
import { BoardContext } from "../App";

interface KeyProp {
	letter: string;
	nonLetter: boolean;
}

export const Key: FC<KeyProp> = ({ letter, nonLetter }) => {
	const { enterKey, backKey, letterKey } = useContext(BoardContext);

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
			className={`m-1 rounded-sm bg-[#818384] text-lg font-semibold hover:cursor-pointer hover:bg-[#27281B]`}
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
