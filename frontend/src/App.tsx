import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Board } from "./component/board";
import { Header } from "./component/header";
import { boardGrid, checkWord, getDaily } from "./util/board";
import { Keyboard } from "./component/keyboard";
import { StatCard } from "./component/statsCard";
import { Login } from "./component/login";
import { AppContext, curGuess, currentGame, userStats } from "./util/types";
import { InfoModal } from "./component/infoModal";

export const BoardContext = createContext<AppContext>({
	board: boardGrid,
	index: { row: 0, col: 0 },
	actualWord: "",
	login: false,
	curGuess: "",
	showLogin: () => undefined,
	setIndex: () => undefined,
	setGuess: () => undefined,
	enterKey: () => undefined,
	backKey: () => undefined,
	letterKey: () => undefined,
});

function App() {
	const [cookie, _] = useCookies(['auth_token']);
	const [board, setBoard] = useState<string[][]>(boardGrid);
	const [actualWord, setWord] = useState<string>(" ");
	const [curGuess, setGuess] = useState<string>("");
	const [stats, showStats] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(false);
	const [infoState, setInfoState] = useState<boolean>(false);
	const [invalidWord, setInvalid] = useState<boolean>(false);
	const [guessCount, setGuessCount] = useState<number>(0);
	const [index, setIndex] = useState<curGuess>({ row: 0, col: 0 });
	const [userStats, setUserStats] = useState<userStats>({
		curStreak: 0,
		maxStreak: 0,
		played: 0,
		wins: 0,
		winPercent: 0,
		distribution: [0, 0, 0, 0, 0, 0],
	});

	const keyEnter = () => {
		if (index.col !== 5) return;

		if (!checkWord(curGuess.toLowerCase())) {
			setInvalid(true);
			setTimeout(() => {
				setInvalid(false);
			}, 1500);
			return;
		}
		setIndex({ row: index.row + 1, col: 0 });
	};

	const backKey = () => {
		let temp = [...board];
		if (index.col <= 0 || index.col > 5) return;

		temp[index.row][index.col - 1] = "";
		setBoard(temp);
		setIndex({ ...index, col: index.col >= 0 ? index.col - 1 : 0 });
		setGuess(board[index.row].join(""));
	};

	const letterKey = (letter: string) => {
		let temp = [...board];
		if (index.col > 4) return;

		if (letter !== "Enter" && letter !== "Back") {
			temp[index.row][index.col] = letter;
			setBoard(temp);
			setIndex({ ...index, col: index.col + 1 });
			setGuess(board[index.row].join(""));
		}
	};

	useEffect(() => {
		const newDaily = getDaily();
		setWord(newDaily.toUpperCase());	

		const curGameData = window.localStorage.getItem("currentGame");
		const curUserData = window.localStorage.getItem("userStats");
		if (curUserData) {
			const res: userStats = JSON.parse(curUserData);
			setUserStats({
				curStreak: res.curStreak,
				maxStreak: res.maxStreak,
				winPercent: res.winPercent,
				wins: res.wins,
				played: res.played,
				distribution: res.distribution,
			});
		}

		if (curGameData) {
			const curGame: currentGame = JSON.parse(curGameData);
			setBoard(curGame.board);
			setIndex(curGame.index);
		}
	}, []);

	if (curGuess === actualWord || index.row == 6) {
		let win: number = userStats.wins;
		let played: number = userStats.played + 1;
		let newDistribution: number[] = userStats.distribution;
		if (curGuess === actualWord) {
			setGuess(() => "");
			newDistribution[index.row] += 1 / 2;
			setGuessCount(index.col + 1);
			win += 1;
		}
		setIndex({ row: 5, col: 6 });

		const newStats: userStats = {
			curStreak: userStats.curStreak,
			played: played,
			wins: win,
			winPercent: (win / played) * 100,
			maxStreak: userStats.maxStreak,
			distribution: newDistribution,
		};

		setUserStats(newStats);
		showStats(true);
		window.localStorage.setItem("userStats", JSON.stringify(newStats));
	}

	return (
		<div className="App min-h-screen bg-[#0e0f10] py-3 font-sans text-white">
			{invalidWord && (
				<div className="absolute left-0 right-0 top-12 z-10 mx-auto flex h-10 w-32 items-center justify-center rounded-md bg-[#FFFFFF] text-center text-xs font-bold text-black">
					Not a word in list
				</div>
			)}
			<Header
				stats={stats}
				showStats={showStats}
				infoState={infoState}
				setInfoState={setInfoState}
			></Header>
			<BoardContext.Provider
				value={{
					board,
					index,
					actualWord,
					login,
					curGuess,
					showLogin: setLogin,
					setIndex,
					setGuess,
					enterKey: keyEnter,
					backKey: backKey,
					letterKey: letterKey,
				}}
			>
				<Board></Board>
				<Keyboard></Keyboard>
				{infoState && (
					<InfoModal
						modalState={infoState}
						setModal={setInfoState}
					></InfoModal>
				)}
				{stats && (
					<StatCard
						guessCount={guessCount}
						userStats={userStats}
						stats={stats}
						showStats={showStats}
					></StatCard>
				)}
				{login && <Login userStats={userStats}></Login>}
			</BoardContext.Provider>
		</div>
	);
}

export default App;
