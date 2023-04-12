import { FC, useContext } from "react";
import { BoardContext } from "../App";
import { checkWord } from "../util/board";

interface KeyProp {
	letter: string;
	nonLetter: boolean;
	color: string;
}

export const Key: FC<KeyProp> = ({ letter, nonLetter, color }) => {
	const {
		board,
		index,
		curGuess,
		setBoard,
		setIndex,
		setGuess,
		invalid,
		setInvalid,
	} = useContext(BoardContext);

	const invalidTimer = () => {
		setTimeout(() => {
			setInvalid(!invalid);
		}, 1000);
	};

	const setLetter = () => {
		let temp = [...board];
		if (letter === "Enter") {
			if (index.col != 5) return;

			if (!checkWord(curGuess.toLowerCase())) {
				setInvalid(!invalid);
				setTimeout(() => {
					setInvalid(!invalid);
				}, 1000);
				return;
			}

			setIndex({ row: index.row + 1, col: 0 });
		} else if (letter === "Back") {
			if (index.col < 0 || index.col > 5) return;

			temp[index.row][index.col - 1] = "";
			setBoard(temp);
			setIndex({ ...index, col: index.col > 0 ? index.col - 1 : 0 });
			setGuess(board[index.row].join(""));
		} else {
			if (index.col > 4) return;

			temp[index.row][index.col] = letter;
			setBoard(temp);
			setIndex({ ...index, col: index.col + 1 });
			setGuess(board[index.row].join(""));
		}
	};

	return (
		<div
			className={`${color} rounded-sm text-lg font-semibold m-1 hover:cursor-pointer hover:bg-[#27281B]`}
			onClick={() => {
				setLetter();
			}}
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
