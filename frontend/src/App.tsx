import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
	showLogin: () => undefined,
	setIndex: () => undefined,
	setBoard: () => undefined,
	enterKey: () => undefined,
	backKey: () => undefined,
	letterKey: () => undefined,
});

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

function App() {
	const [cookie, _] = useCookies(["auth_token"]);
	const [board, setBoard] = useState<string[][]>(boardGrid);
	const [stats, showStats] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(false);
	const [infoState, setInfoState] = useState<boolean>(false);
	const [invalidWord, setInvalid] = useState<boolean>(false);
	const [sidePanel, showSidePanel] = useState<boolean>(false);
	const [index, setIndex] = useState<curGuess>({ row: 0, col: 0 });

	//REFS?
	const actualWord = useRef<string | null>(null);
	const curGuess = useRef<string | null>("");
	const userStats = useRef<userStats>({
		curStreak: 0,
		maxStreak: 0,
		played: 0,
		wins: 0,
		winPercent: 0,
		distribution: [0, 0, 0, 0, 0, 0],
	});

	//might be better to just have a useeffect checking if the there is a cookie
	useQuery({
		queryKey: ["fetch"],
		queryFn: () => {
			if (cookie.auth_token) {
				const userID = window.localStorage.getItem("userID");
				const res = fetchData(userID!);
				return res;
			}
			return null;
		},
		onSuccess: (data) => {
			if (data) {
				userStats.current = data;
				setBoard(data.game.board);
				setIndex(data.game.index);
			}
		},
	});

	const update = useMutation({
		mutationFn: (userID: string) =>
			axios.patch("http://localhost:5000/user/updateData", [
				{
					userID: userID,
					stats: {
						wins: userStats.current.wins,
						curStreak: userStats.current.curStreak,
						maxStreak: userStats.current.maxStreak,
						winPercent: userStats.current.winPercent,
						played: userStats.current.played,
						distribution: userStats.current.distribution,
						game: { board: board, index: index, guess: curGuess },
					},
				},
			]),
	});

	const keyEnter = () => {
		if (index.col !== 5) return;

		if (!checkWord(curGuess.current!.toLowerCase())) {
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
		curGuess.current = board[index.row].join("");
	};

	const letterKey = (letter: string) => {
		let temp = [...board];
		if (index.col > 4) return;

		if (letter !== "Enter" && letter !== "Back") {
			temp[index.row][index.col] = letter;
			setBoard(temp);
			setIndex({ ...index, col: index.col + 1 });
			curGuess.current = board[index.row].join("");
		}
	};

	//use effect to run on component mount
	useEffect(() => {
		//get daily word
		const newDaily = getDaily();
		actualWord.current = newDaily.toUpperCase();

		//if there is no token, we get data from local storage
		if (cookie.auth_token === undefined) {
			const curGameData = window.localStorage.getItem("currentGame");
			const curUserData = window.localStorage.getItem("userStats");

			//parse local user stats and board
			if (curUserData) {
				const res: userStats = JSON.parse(curUserData);
				userStats.current = {
					curStreak: res.curStreak,
					maxStreak: res.maxStreak,
					winPercent: res.winPercent,
					wins: res.wins,
					played: res.played,
					distribution: res.distribution,
				};
			}

			if (curGameData) {
				const curGame: currentGame = JSON.parse(curGameData);
				setBoard(curGame.board);
				setIndex(curGame.index);
			}
		}

		return () => {
			if (cookie.auth_token !== undefined) {
				window.addEventListener("beforeunload", (e) => {
					e.preventDefault();
					const userID = window.localStorage.getItem("userID");
					update.mutate(userID!);
				});
			}
		};
	}, []);

	//use effect to run whenever the index changes
	useEffect(() => {
		if (board != boardGrid && !cookie.auth_token) {
			const curGame: currentGame = {
				board,
				index: { row: index.row, col: index.col },
				guess: curGuess.current!,
			};
			window.localStorage.setItem("currentGame", JSON.stringify(curGame));
		}

		if (curGuess.current === actualWord.current || index.row == 6) {
			console.log(curGuess.current, actualWord.current);
			let win: number = userStats.current.wins;
			let played: number = userStats.current.played + 1;
			let newDistribution: number[] = userStats.current.distribution;
			if (curGuess.current === actualWord.current) {
				curGuess.current = "";

				//remove /2 in production 
				//happens bc of strict mode
				newDistribution[index.row] += 1 / 2;
				win += 1;
			}
			setIndex({ row: 5, col: 6 });

			const newStats: userStats = {
				curStreak: userStats.current.curStreak,
				played: played,
				wins: win,
				winPercent: (win / played) * 100,
				maxStreak: userStats.current.maxStreak,
				distribution: newDistribution,
			};

			if (!cookie.auth_token) {
				window.localStorage.setItem(
					"userStats",
					JSON.stringify(newStats)
				);
			} else {
				const userID = window.localStorage.getItem("userID");
				update.mutate(userID!);
			}

			userStats.current = newStats;
			showStats(true);
		}
	}, [index]);

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
						setUserStats={userStats}
						sidePanel={sidePanel}
						showSidePanel={showSidePanel}
						login={login}
						showLogin={setLogin}
						curGuess={curGuess}
					></SidePanel>
				)}
			</AnimatePresence>
			<BoardContext.Provider
				value={{
					board,
					index,
					actualWord: actualWord.current!,
					login,
					showLogin: setLogin,
					setBoard: setBoard,
					setIndex,
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
							userStats={userStats.current}
							stats={stats}
							showStats={showStats}
						></StatCard>
					)}
				</AnimatePresence>
				{login && <Login userStats={userStats.current} ref={curGuess}></Login>}
			</BoardContext.Provider>
		</div>
	);
}

export default App;
