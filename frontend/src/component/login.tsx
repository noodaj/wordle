import React, { FC, useRef, useState } from "react";

interface userStats {
	curStreak: number;
	maxStreak: number;
	wins: number;
	played: number;
	winPercent: number;
	distribution: number[],
}

interface LoginProps {
	login: boolean;
	showLogin: React.Dispatch<React.SetStateAction<boolean>>;
	userStats: userStats
}
export const Login: FC<LoginProps> = ({ login, showLogin }) => {
	const [newUser, showNewForm] = useState<boolean>(false);
	const userName = useRef<string>("")
	const password = useRef<string>("")
	return (
		<div className="inset-0 absolute bg-black/75">
			<div>test</div>
			<button
				onClick={() => {
					showLogin(!login);
				}}
			>HIDE</button>
		</div>
	);
};
