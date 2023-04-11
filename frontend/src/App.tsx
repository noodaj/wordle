import axios from "axios";
import { createContext, useState, Dispatch, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Board } from "./component/board";
import { Header } from "./component/header";
import { boardGrid } from "./board";
import { Keyboard } from "./component/keyboard";
import { StatCard } from "./component/statsCard";
import { Login } from "./component/login";

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
	const [actualWord, setWord] = useState<string>(" ");
	const [board, setBoard] = useState(boardGrid);
	const [index, setIndex] = useState<curGuess>({
		row: 0,
		col: 0,
	});
	const [stats, showStats] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(false);
	const [curGuess, setGuess] = useState<string>("");

	useEffect(() => {
		const getDaily = async () => {
			const res = await axios.get("http://localhost:5000/words");
			setWord(res.data.daily);
		};

		getDaily();
	}, []);

	if (curGuess == actualWord || index.row == 6) {
		setIndex({ col: 6, row: 4 });
		setGuess("");
		showStats(true);
	}

	return (
		<div className="App min-h-screen bg-[#0e0f10] text-white py-3 font-sans">
			<Header
				stats={stats}
				showStats={showStats}
				login={login}
				showLogin={setLogin}
			></Header>
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
				{stats && (
					<StatCard
						curStreak={1}
						guessCount={0}
						maxStreak={1}
						played={5}
						wins={0}
						stats
						showStats={showStats}
						login={login}
						showLogin={setLogin}
					></StatCard>
				)}
				{login && <Login login={login} showLogin={setLogin}></Login>}
			</BoardContext.Provider>
		</div>
	);
}

export default App;
