import { FC, useCallback, useContext, useEffect } from "react";
import { BoardContext } from "../App";
import { currentGame } from "../util/types";
import { Key } from "./key";

interface KeyboardProps {}

let createRow = (row: string[]) => {
	let c = 0;
	return row.map((letter) => {
		c += 1;
		return (
			<div className="flex flex-col" key={Math.random() * 50}>
				<Key
					letter={letter}
					nonLetter={false}
					color={"bg-[#818384]"}
				></Key>
			</div>
		);
	});
};

export const Keyboard: FC<KeyboardProps> = () => {
	const { board, letterKey, enterKey, backKey, index, login, curGuess } =
		useContext(BoardContext);
	const r1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const r2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const r3 = ["Z", "X", "C", "V", "B", "N", "M"];

	let item1 = createRow(r1);
	let item2 = createRow(r2);
	let item3 = createRow(r3);

	const handleKey = useCallback(
		(e: any) => {
			if (
				e.key !== "Enter" &&
				e.key !== "Backspace" &&
				e.keyCode >= 65 &&
				e.keyCode <= 90
			) {
				letterKey(e.key.toUpperCase());
			} else if (e.key === "Enter") {
				enterKey();
			} else if(e.key === "Backspace"){
				backKey();
			}
			
			const curGame: currentGame = {
				board: board,
				index: { row: index.row, col: index.col },
				guess: curGuess,
			};
	
			//window.localStorage.setItem("currentGame", JSON.stringify(curGame));
		},
		[index]
	);

	useEffect(() => {
		if (!login) {
			window.addEventListener("keydown", handleKey);

			return () => {
				window.removeEventListener("keydown", handleKey);
			};
		}
	}, [handleKey, login]);

	return (
		<div
			className="m-3 flex flex-col items-center justify-center"
			onKeyDown={handleKey}
		>
			<div className="flex">{item1}</div>
			<div className="flex">{item2}</div>
			<div className="flex">
				<Key
					letter="Enter"
					nonLetter={true}
					color={"bg-[#818384]"}
				></Key>
				{item3}
				<Key
					letter="Back"
					nonLetter={true}
					color={"bg-[#818384]"}
				></Key>
			</div>
		</div>
	);
};

/**
 	if (index.row > 0) {
		for (let i = 0; i < 5; i++) {
			const correct =
				curGuess != "" &&
				curGuess[i] === actualWord[i] &&
				curGuess[i] == letter;
			console.log(letter, correct, curGuess[i], actualWord[i]);
			if (correct) {
				setColor("bg-[#538D4E]");
			}
		}
	}
 */
