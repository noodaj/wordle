export interface curGuess {
	row: number;
	col: number;
}

export interface AppContext {
	board: string[][];
	index: curGuess;
	actualWord: string;
	login: boolean;
	curGuess: string;
	showLogin: React.Dispatch<React.SetStateAction<boolean>>;
	setIndex: React.Dispatch<React.SetStateAction<curGuess>>;
	setGuess: React.Dispatch<React.SetStateAction<string>>;
	enterKey: () => void;
	backKey: () => void;
	letterKey: (letter: string) => void;
}

export interface userStats {
	curStreak: number;
	maxStreak: number;
	wins: number;
	played: number;
	winPercent: number;
	distribution: number[];
}

export interface currentGame {
	board: string[][];
	index: { row: number; col: number };
	guess: string;
}
