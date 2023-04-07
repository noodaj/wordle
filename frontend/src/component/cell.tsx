import { FC, useContext } from "react";
import { BoardContext } from "../App";

interface CellProps {
	letter: string;
}

export const Cell: FC<CellProps> = ({letter}) => {
	const {curGuess}= useContext(BoardContext)
	return (
		<>
			<div className="flex items-center justify-center border-2 text-3xl font-semibold w-16 h-16 mx-1">
				{letter}
			</div>
		</>
	);
};
