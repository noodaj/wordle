import React, { FC } from "react";
import { IoMdClose } from "react-icons/io";

interface InfoProps {
	modalState: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const InfoModal: FC<InfoProps> = ({ modalState, setModal }) => {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black/75">
			<div className="w-[500px] h-[600px] border-1 rounded-lg bg-[#0e0f10]">
				<nav>
					<IoMdClose
						className="float-right mr-4 mt-4 hover:cursor-pointer"
						onClick={() => {
							setModal(!modalState);
						}}
					></IoMdClose>
				</nav>
				<div className="mx-6 mt-16 text-lg">
					<div className="pb-3">
						<h2 className="text-2xl">How To Play</h2>
						<h3 className="text-lg font-semibold">
							Guess the Wordle in 6 tries.
						</h3>
					</div>
					<div className="font-normal text-base">
						<li>Each guess must be a valid 5-letter word.</li>
						<li>
							The color of the tiles will change to show how close
							your guess was to the word.
						</li>
					</div>
				</div>
			</div>
		</div>
	);
};
