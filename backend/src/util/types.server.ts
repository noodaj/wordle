//model for user
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

//model for updating userdata
export interface IUserData {
	userID: string;
	stats: {
		wins: number;
		curStreak: number;
		maxStreak: number;
		winPercent: number;
		played: number;
		distribution: number[];
	};
}

export interface word {
	word: string;
}

//model for getting user data
export interface userData {
	_id: string;
	wins: number;
	curStreak: number;
	maxStreak: number;
	winPercent: number;
	played: number;
	distribution: number[];
}
