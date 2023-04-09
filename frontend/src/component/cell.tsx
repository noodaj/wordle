import { FC, useContext } from "react";
import { BoardContext } from "../App";

interface CellProps {
	letter: string;
	r: number;
	c: number;
}

export const Cell: FC<CellProps> = ({ letter, r, c }) => {
	const { index, actualWord } = useContext(BoardContext);

	const correctLetter = letter != "" && letter === actualWord[c];
	const hasLetter = letter != "" && actualWord.includes(letter);
	let color = "";
	if (index.row > r) {
		if (hasLetter && !correctLetter) {
			color = "bg-[#B59F3B]";
		}
		if (correctLetter && hasLetter) {
			color = "bg-[#538D4E]";
		}
		if(!correctLetter && !hasLetter && letter != ""){
			color = "bg-[#3A3A3C]"
		}
	}

	return (
		<>
			<div className={`flex items-center justify-center border-2 text-3xl font-semibold w-16 h-16 mx-1 ${color}`}>
				{letter}
			</div>
		</>
	);
};
