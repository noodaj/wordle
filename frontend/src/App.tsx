import { Board } from "./component/board";
import { Header } from "./component/header";
import { createContext, useState, Dispatch } from "react";
import { boardGrid } from "./board";
import { Keyboard } from "./component/keyboard";

type curGuess = {
	row: number;
	col: number;
};

type boardState = {
	board: string[][];
	setBoard: Dispatch<React.SetStateAction<string[][]>>;
	index: curGuess;
	setIndex: Dispatch<React.SetStateAction<curGuess>>;
};

export const BoardContext = createContext<boardState>({
	board: boardGrid,
	setBoard: () => undefined,
	index: { row: 0, col: 0 },
	setIndex: () => undefined,
});

function App() {
	const [board, setBoard] = useState(boardGrid);
	const [index, setIndex] = useState<curGuess>({
		row: 0,
		col: 0,
	});

	return (
		<div className="App min-h-screen bg-[#0e0f10] text-white py-3 font-sans">
			<Header></Header>
			<BoardContext.Provider value={{ board, setBoard, index, setIndex }}>
				<Board></Board>
				<Keyboard></Keyboard>
			</BoardContext.Provider>
		</div>
	);
}

export default App;
