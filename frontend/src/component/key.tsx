import { FC, useContext, useState } from "react";
import { BoardContext } from "../App";

interface KeyProp {
	letter: string;
	nonLetter: boolean;
	c: number;
}

export const Key: FC<KeyProp> = ({ letter, nonLetter, c }) => {
	const { board, index, setBoard, setIndex, setGuess, actualWord } =
		useContext(BoardContext);

	//const [color, setColor] = useState<string>("bg-[#818384]");
	const setLetter = () => {
		let temp = [...board];
		if (letter === "Enter") {
			if (index.col != 5) return;

			setGuess(board[index.row].join(""));
			setIndex({ row: index.row + 1, col: 0 });
		} else if (letter === "Back") {
			if (index.col < 0 || index.col > 5) return;

			temp[index.row][index.col - 1] = "";
			setBoard(temp);
			setIndex({ ...index, col: index.col > 0 ? index.col - 1 : 0 });
		} else {
			if (index.col > 4) return;

			temp[index.row][index.col] = letter;
			setBoard(temp);
			setIndex({ ...index, col: index.col + 1 });

			if (actualWord.includes(letter)) {
				let newColor = "bg-[#538D4E]";
			}
		}
	};

	return (
		<div
			className={`bg-[#818384] rounded-sm text-lg font-semibold m-1 hover:cursor-pointer hover:bg-[#27281B]`}
			onClick={setLetter}
		>
			{!nonLetter ? (
				<div className="flex w-10 h-14 items-center justify-center">
					{letter}
				</div>
			) : (
				<div className="flex w-16 h-14 items-center justify-center">
					{letter}
				</div>
			)}
		</div>
	);
};
