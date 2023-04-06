import React, { FC, useContext } from "react";
import { BoardContext } from "../App";

interface KeyProp {
	letter: string;
	nonLetter: boolean;
}

export const Key: FC<KeyProp> = ({ letter, nonLetter }) => {
	const { board, index, setBoard, setIndex } = useContext(BoardContext);
	const setLetter = () => {
		if (letter === "Enter") {
			if (index.col != 5) return;
			setIndex({ ...index, row: index.row + 1 });
		} else {
			if (index.col > 4) return;
			let temp = [...board];
			temp[index.row][index.col] = letter;
			setBoard(temp);
			setIndex({ ...index, col: index.col + 1 });
		}
	};

	return (
		<div
			className="bg-[#818384] rounded-sm text-lg font-semibold m-1 hover:cursor-pointer hover:bg-[#27281B]"
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
