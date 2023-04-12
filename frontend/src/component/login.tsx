import React, { FC } from "react";

interface LoginProps {
	login: boolean;
	showLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Login: FC<LoginProps> = ({ login, showLogin }) => {
	return (
		<>
			<div>test</div>
			<button
				onClick={() => {
					showLogin(!login);
				}}
			>HIDE</button>
		</>
	);
};
