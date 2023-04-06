import { Board } from "./component/board";
import { Header } from "./component/header";
import { createContext, useState, Dispatch } from "react";
import { boardGrid } from "./board";

type boardState = {
	board: string[][];
	setBoard: Dispatch<React.SetStateAction<string[][]>>;
};

export const BoardContext = createContext<boardState>({
	board: boardGrid,
	setBoard: () => undefined,
});

function App() {
	const [board, setBoard] = useState(boardGrid);
	return (
		<div className="App min-h-screen bg-[#0e0f10] text-white py-3 font-sans">
			<Header></Header>
			<BoardContext.Provider value={{ board, setBoard }}>
				<Board></Board>
			</BoardContext.Provider>
		</div>
	);
}

export default App;
