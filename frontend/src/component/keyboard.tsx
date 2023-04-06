import { FC } from "react";
import { Key } from "./key";

interface KeyboardProps {}

let createRow = (row: string[]) => {
	return row.map((letter) => {
		return (
			<div className="flex flex-col" key={Math.random() * 50}>
				<Key letter={letter} nonLetter={false}></Key>
			</div>
		);
	});
};

export const Keyboard: FC<KeyboardProps> = () => {
	const r1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const r2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const r3 = ["Z", "X", "C", "V", "B", "N", "M"];

	let item1 = createRow(r1);
	let item2 = createRow(r2);
	let item3 = createRow(r3);

	return (
		<div className="flex flex-col items-center justify-center m-3">
			<div className="flex">{item1}</div>
			<div className="flex">{item2}</div>
			<div className="flex">
				<Key letter="Enter" nonLetter={true}></Key>
				{item3}
				<Key letter="Back" nonLetter={true}></Key>
			</div>
		</div>
	);
};
