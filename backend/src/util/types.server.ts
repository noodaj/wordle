export interface IUser {
	username: string;
	password: string;
	wins: number;
	curStreak: number;
	maxStreak: number;
	winPercent: number;
	played: number;
	distribution: number[];
}

export interface IUserData {
	userID: string;
	wins: number;
	curStreak: number;
	maxStreak: number;
	winPercent: number;
	played: number;
}

export interface word {
	word: string;
}
