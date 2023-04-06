import React, { FC, useContext } from "react";
import { BoardContext } from "../App";

interface CellProps {
	row: number;
	col: number;
}

export const Cell: FC<CellProps> = ({ row, col }) => {
	const { board, setBoard } = useContext(BoardContext);
	return (
		<>
			<div className="flex items-center justify-center border-2 text-3xl font-semibold w-16 h-16 mx-1">
				J
			</div>
		</>
	);
};
