import React, { FC } from "react";
import { useCookies } from "react-cookie";
import { IoMdClose } from "react-icons/io";

interface props {
	sidePanel: boolean;
	login: boolean;
	showSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
	showLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SidePanel: FC<props> = ({ showSidePanel, showLogin }) => {
	const [cookie] = useCookies(["auth_token"]);

	function delete_cookie(name: string) {
		document.cookie =
			name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}

	return (
		<div
			className="absolute h-[867px] w-96 border border-[#837A6C] hover:cursor-pointer"
			onClick={() => {
				showSidePanel(!SidePanel);
			}}
		>
			<nav>
				<IoMdClose
					className="float-right mr-4 mt-4 text-3xl hover:cursor-pointer"
					onClick={() => {
						showSidePanel(!SidePanel);
					}}
				></IoMdClose>
			</nav>
			<div className="absolute bottom-0 left-0 right-0 m-auto flex items-end justify-center">
				{cookie.auth_token ? (
					<button
						className="mb-3 h-10 w-80 rounded border border-[#303436]"
						onClick={() => {
							delete_cookie("auth_token");
							window.localStorage.removeItem("userID")
						}}
					>
						Logout
					</button>
				) : (
					<button
						className="mb-3 h-10 w-80 rounded border border-[#303436]"
						onClick={() => {
							showLogin(true);
						}}
					>
						Log In
					</button>
				)}
			</div>
		</div>
	);
};
