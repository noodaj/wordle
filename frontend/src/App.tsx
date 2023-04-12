import axios from "axios";
import React, { createContext, useState, Dispatch, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Board } from "./component/board";
import { Header } from "./component/header";
import { boardGrid, getDaily } from "./util/board";
import { Keyboard } from "./component/keyboard";
import { StatCard } from "./component/statsCard";
import { Login } from "./component/login";

interface curGuess{
	row: number;
	col: number;
};

interface AppContext {
	board: string[][];
	setBoard: Dispatch<React.SetStateAction<string[][]>>;
	index: curGuess;
	setIndex: Dispatch<React.SetStateAction<curGuess>>;
	actualWord: string;
	curGuess: string;
	setGuess: Dispatch<React.SetStateAction<string>>;
	invalid: boolean;
	setInvalid: Dispatch<React.SetStateAction<boolean>>;
}

interface userStats {
	curStreak: number;
	maxStreak: number;
	wins: number;
	played: number;
	winPercent: number;
	distribution: number[],
}

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
	const [board, setBoard] = useState<string[][]>(boardGrid);
	const [actualWord, setWord] = useState<string>(" ");
	const [curGuess, setGuess] = useState<string>("");
	const [stats, showStats] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(false);
	const [invalidWord, setInvalid] = useState<boolean>(false);
	const [guessCount, setGuessCount] = useState<number>(0);
	const [index, setIndex] = useState<curGuess>({ row: 0, col: 0 });
	const [userStats, setUserStats] = useState<userStats>({
		curStreak: 0,
		maxStreak: 0,
		played: 0,
		wins: 0,
		winPercent: 0,
		distribution: [0,0,0,0,0,0]
	});

	useEffect(() => {
		const newDaily = getDaily();
		setWord(newDaily.toUpperCase());
		const curUserData = window.localStorage.getItem("userStats");
		if (curUserData) {
			const res: userStats = JSON.parse(curUserData);
			setUserStats({
				curStreak: res.curStreak,
				maxStreak: res.maxStreak,
				winPercent: res.winPercent,
				wins: res.wins,
				played: res.played,
				distribution: res.distribution
			});
		}
	}, []);

	if (curGuess === actualWord || index.row == 6) {
		let win: number = userStats.wins;
		let played: number = userStats.played + 1;
		if (curGuess === actualWord) {
			userStats.distribution[index.col] += 1
			setGuessCount(index.col + 1)
			setGuess("");
			win += 1;
		}
		setIndex({ col: 6, row: 4 });

		const newStats: userStats = {
			curStreak: userStats.curStreak,
			played: played,
			wins: win,
			winPercent: win / played,
			maxStreak: userStats.maxStreak,
			distribution: userStats.distribution
		};

		setUserStats(newStats);
		showStats(true);
		window.localStorage.setItem("userStats", JSON.stringify(newStats));
	}

	return (
		<div className="App min-h-screen bg-[#0e0f10] text-white py-3 font-sans">
			<Header
				stats={stats}
				showStats={showStats}
				login={login}
				showLogin={setLogin}
			></Header>
			{invalidWord && (
				<div className="absolute rounded-sm w-screen left-0 right-0 mx-auto bg-[#818384] z-10 text-center">
					Invalid word
				</div>
			)}
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
						guessCount={guessCount}
						userStats={userStats}
						stats={stats}
						showStats={showStats}
						login={login}
						showLogin={setLogin}
					></StatCard>
				)}
				{login && <Login login={login} showLogin={setLogin} userStats={userStats}></Login>}
			</BoardContext.Provider>
		</div>
	);
}

export default App;
