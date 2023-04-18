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
	if (index.row > r || index.row == 5 && index.col == 6) {
		if (hasLetter && !correctLetter) {
			color = "bg-[#B59F3B]";
		}
		if (correctLetter && hasLetter) {
			color = "bg-[#538D4E]";
		}
		if (!correctLetter && !hasLetter && letter != "") {
			color = "bg-[#3A3A3C]";
		}
	}
	
	return (
		<>
			<div
				className={`mx-1 flex h-16 w-16 items-center justify-center border-2 text-3xl font-semibold ${color}`}
			>
				{letter}
			</div>
		</>
	);
};
