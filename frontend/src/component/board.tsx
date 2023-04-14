import { FC, useContext } from "react";
import { BoardContext } from "../App";
import { Cell } from "./cell";

export const Board: FC = () => {
	const { board } = useContext(BoardContext);

	let rowIndex = 0,
		colIndex = 0;

	const boardItem = board.map((row) => {
		rowIndex += 1;
		colIndex = 0;
		return (
			<div className="my-1 flex" key={rowIndex}>
				{row.map((letter) => {
					colIndex += 1;
					return (
						<Cell
							key={colIndex}
							letter={letter}
							r={rowIndex - 1}
							c={colIndex - 1}
						></Cell>
					);
				})}
			</div>
		);
	});
	return (
		<div className="mt-6 flex flex-col items-center justify-center">
			{boardItem}
		</div>
	);
};
