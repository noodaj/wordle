import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useCookies } from "react-cookie";
import { Board } from "./component/board";
import { Header } from "./component/header";
import { InfoModal } from "./component/infoModal";
import { Keyboard } from "./component/keyboard";
import { Login } from "./component/login";
import { SidePanel } from "./component/sidePanel";
import { StatCard } from "./component/statsCard";
import { boardGrid, checkWord, getDaily } from "./util/board";
import { AppContext, curGuess, currentGame, userStats } from "./util/types";

export const BoardContext = createContext<AppContext>({
	board: boardGrid,
	index: { row: 0, col: 0 },
	login: false,
	actualWord: "",
	curGuess: "",
	showLogin: () => undefined,
	setIndex: () => undefined,
	setGuess: () => undefined,
	enterKey: () => undefined,
	backKey: () => undefined,
	letterKey: () => undefined,
});

function App() {
	const [cookie, _] = useCookies(["auth_token"]);
	const queryClient = useQueryClient();
	const [board, setBoard] = useState<string[][]>(boardGrid);
	const [actualWord, setWord] = useState<string>(" ");
	const [curGuess, setGuess] = useState<string>("");
	const [stats, showStats] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(false);
	const [infoState, setInfoState] = useState<boolean>(false);
	const [invalidWord, setInvalid] = useState<boolean>(false);
	const [sidePanel, showSidePanel] = useState<boolean>(false);
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

	useQuery({
		queryKey: ["fetch"],
		queryFn: () => {
			if (cookie.auth_token != undefined) {
				const userID = window.localStorage.getItem("userID");
				const res = fetchData(userID!);
				return res;
			}
			return null;
		},
		onSuccess: (data) => {
			if (data) {
				setUserStats(data);
			}
		},
	});

	const update = useMutation({
		mutationFn: (userID: string) =>
			axios.patch("http://localhost:5000/user/updateData", [
				{
					userID: userID,
					stats: {
						wins: 1,
						curStreak: 1,
						maxStreak: 11,
						winPercent: 5,
						played: 1,
						distribution: [],
					},
				},
			]),
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

	//function to get userData if user is signed in
	const fetchData = async (userID: string) => {
		try {
			const res = await axios.get("http://localhost:5000/user/getData", {
				params: { userID: userID },
			});
			const data = await res.data;
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	//use effect to run on component mount
	useEffect(() => {
		//get daily word
		const newDaily = getDaily();
		setWord(newDaily.toUpperCase());

		//if there is no token, we get data from local storage
		if (!cookie.auth_token) {
			const curGameData = window.localStorage.getItem("currentGame");
			const curUserData = window.localStorage.getItem("userStats");

			//parse local user stats and board
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
		}
	}, []);

	//use effect to run whenever the index changes
	useEffect(() => {
		if (board != boardGrid && !cookie.auth_token) {
			const curGame: currentGame = {
				board,
				index: { row: index.row, col: index.col },
				guess: curGuess,
			};
			window.localStorage.setItem("currentGame", JSON.stringify(curGame));
		}
	}, [index]);

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

		if (!cookie.auth_token) {
			setUserStats(newStats);
			showStats(true);
			window.localStorage.setItem("userStats", JSON.stringify(newStats));
		}
	}

	return (
		<div className="App min-h-screen overflow-hidden bg-[#0e0f10] py-3 font-sans text-white">
			{invalidWord && (
				<div className="absolute left-0 right-0 top-12 z-10 mx-auto flex h-10 w-32 items-center justify-center rounded-md bg-[#FFFFFF] text-center text-xs font-bold text-black">
					Not a word in list
				</div>
			)}
			<Header
				stats={stats}
				sidePanel={sidePanel}
				showStats={showStats}
				infoState={infoState}
				setInfoState={setInfoState}
				showSidePanel={showSidePanel}
			></Header>
			<AnimatePresence initial={false} mode="wait">
				{sidePanel && (
					<SidePanel
						sidePanel={sidePanel}
						showSidePanel={showSidePanel}
						login={login}
						showLogin={setLogin}
					></SidePanel>
				)}
			</AnimatePresence>
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
				<AnimatePresence initial={false} mode="wait" key={"board"}>
					<Board></Board>
				</AnimatePresence>
				<Keyboard></Keyboard>
				<AnimatePresence initial={false} mode="wait">
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
				</AnimatePresence>
				{login && <Login userStats={userStats}></Login>}
			</BoardContext.Provider>
		</div>
	);
}

export default App;
