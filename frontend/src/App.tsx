import axios from "axios";
import React, { createContext, useState, Dispatch, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Board } from "./component/board";
import { Header } from "./component/header";
import { boardGrid, getDaily } from "./util/board";
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
	invalid: boolean;
	setInvalid: Dispatch<React.SetStateAction<boolean>>;
};

export const BoardContext = createContext<AppContext>({
	board: boardGrid,
	setBoard: () => undefined,
	index: { row: 0, col: 0 },
	setIndex: () => undefined,
	actualWord: "",
	curGuess: "",
	setGuess: () => undefined,
	invalid: false,
	setInvalid: () => undefined,
});

function App() {
	const [board, setBoard] = useState(boardGrid);
	const [actualWord, setWord] = useState<string>(" ");
	const [curGuess, setGuess] = useState<string>("");
	const [stats, showStats] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(false);
	const [invalidWord, setInvalid] = useState<boolean>(true);
	const [index, setIndex] = useState<curGuess>({ row: 0, col: 0 });

	useEffect(() => {
		const newDaily = getDaily();
		setWord(newDaily.toUpperCase());
	}, []);

	if (curGuess == actualWord || index.row == 6) {
		setIndex({ col: 6, row: 4 });
		setGuess("");
		showStats(true);
	}

	return (
		<div className="App min-h-screen bg-[#0e0f10] text-white py-3 font-sans">
			{invalidWord && <div className="absolute m-0">Invalid word</div>}
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
					setInvalid,
					invalid: invalidWord,
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
