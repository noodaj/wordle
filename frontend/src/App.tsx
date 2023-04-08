import { Board } from "./component/board";
import { Header } from "./component/header";
import { createContext, useState, Dispatch } from "react";
import { boardGrid } from "./board";
import { Keyboard } from "./component/keyboard";

type curGuess = {
	row: number;
	col: number;
};

type AppContext = {
	board: string[][];
	setBoard: Dispatch<React.SetStateAction<string[][]>>;
	index: curGuess;
	setIndex: Dispatch<React.SetStateAction<curGuess>>;
	actualWord: string;
	curGuess: string;
	setGuess: Dispatch<React.SetStateAction<string>>;
};

export const BoardContext = createContext<AppContext>({
	board: boardGrid,
	setBoard: () => undefined,
	index: { row: 0, col: 0 },
	setIndex: () => undefined,
	actualWord: "",
	curGuess: "",
	setGuess: () => undefined,
});

function App() {
	const actualWord = "POGER";
	const [board, setBoard] = useState(boardGrid);
	const [index, setIndex] = useState<curGuess>({
		row: 0,
		col: 0,
	});
	const [curGuess, setGuess] = useState<string>("");

	if (curGuess == actualWord) {
		setIndex({ col: 6, row: 4 });
		setGuess("")
	}

	return (
		<div className="App min-h-screen bg-[#0e0f10] text-white py-3 font-sans">
			<Header></Header>
			<BoardContext.Provider
				value={{
					board,
					setBoard,
					index,
					setIndex,
					actualWord,
					curGuess,
					setGuess,
				}}
			>
				<Board></Board>
				<Keyboard></Keyboard>
			</BoardContext.Provider>
		</div>
	);
}

export default App;
