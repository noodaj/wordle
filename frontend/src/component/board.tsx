import { FC, useContext } from "react";
import { BoardContext } from "../App";
import { Cell } from "./cell";

export const Board: FC = () => {
	const { board } = useContext(BoardContext);

	let rowIndex = 0,
		colIndex = 0;

	const boardItem = board.map((row) => {
		rowIndex += 1;
		return (
			<div className="flex my-1" key={rowIndex}>
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
		<div className="flex flex-col items-center justify-center mt-10">
			{boardItem}
		</div>
	);
};
