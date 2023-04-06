import { FC, useContext } from "react";
import { BoardContext } from "../App";
import { Cell } from "./cell";

export const Board: FC = () => {
	const { board, setBoard } = useContext(BoardContext);
	return (
		<div className="flex flex-col items-center justify-center mt-20">
			<div className="flex">
				<Cell col={1} row={1}></Cell>
				<Cell col={1} row={2}></Cell>
				<Cell col={1} row={3}></Cell>
				<Cell col={1} row={4}></Cell>
				<Cell col={1} row={5}></Cell>
			</div>
			<div className="flex">
				<Cell col={2} row={1}></Cell>
				<Cell col={2} row={2}></Cell>
				<Cell col={2} row={3}></Cell>
				<Cell col={2} row={4}></Cell>
				<Cell col={2} row={5}></Cell>
			</div>
			<div className="flex">
				<Cell col={3} row={1}></Cell>
				<Cell col={3} row={2}></Cell>
				<Cell col={3} row={3}></Cell>
				<Cell col={3} row={4}></Cell>
				<Cell col={3} row={5}></Cell>
			</div>
			<div className="flex">
				<Cell col={4} row={1}></Cell>
				<Cell col={4} row={2}></Cell>
				<Cell col={4} row={3}></Cell>
				<Cell col={4} row={4}></Cell>
				<Cell col={4} row={5}></Cell>
			</div>
			<div className="flex">
				<Cell col={5} row={1}></Cell>
				<Cell col={5} row={2}></Cell>
				<Cell col={5} row={3}></Cell>
				<Cell col={5} row={4}></Cell>
				<Cell col={5} row={5}></Cell>
			</div>
		</div>
	);
};
