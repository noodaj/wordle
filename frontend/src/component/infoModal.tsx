import React, { FC } from "react";
import { IoMdClose, IoIosStats } from "react-icons/io";
import { Link } from "react-router-dom";

interface InfoProps {
	modalState: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InfoModal: FC<InfoProps> = ({ modalState, setModal }) => {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black/75">
			<div className="w-[525px] h-[675px] rounded-lg bg-[#0e0f10] mt-10">
				<nav>
					<IoMdClose
						className="float-right mr-4 mt-4 hover:cursor-pointer"
						onClick={() => {
							setModal(!modalState);
						}}
					></IoMdClose>
				</nav>
				<div className="mx-8 mt-16 text-lg pointer-events-none">
					<div className="pb-3">
						<p className="text-2xl">How To Play</p>
						<p className="text-lg font-semibold">
							Guess the Wordle in 6 tries.
						</p>
					</div>
					<div className="font-normal text-base">
						<li>Each guess must be a valid 5-letter word.</li>
						<li className="break-words">
							The color of the tiles will change to show how close
							your guess was to the word.
						</li>
					</div>
					<div className="mt-3">
						<p className="text-lg">Examples</p>
						<ul className="mb-5">
							<div className="flex flex-row gap-1 mb-1">
								<div className="bg-[#538D4E] exampleCell">
									W
								</div>
								<div className="exampleCell">E</div>
								<div className="exampleCell">A</div>
								<div className="exampleCell">R</div>
								<div className="exampleCell">Y</div>
							</div>
							<p className="text-base font-light">
								<span className="font-bold">W</span> is in the
								word and in the correct spot.
							</p>
						</ul>
						<ul className="mb-5">
							<div className="flex flex-row gap-1 mb-1">
								<div className="exampleCell">P</div>
								<div className="exampleCell bg-[#B59F3B]">
									I
								</div>
								<div className="exampleCell">L</div>
								<div className="exampleCell">L</div>
								<div className="exampleCell">S</div>
							</div>
							<p className="text-base font-light">
								<span className="font-bold">I</span> is in the
								word but in the wrong spot.
							</p>
						</ul>
						<ul className="mb-5">
							<div className="flex flex-row gap-1 mb-1">
								<div className="exampleCell">V</div>
								<div className="exampleCell">A</div>
								<div className="exampleCell">G</div>
								<div className="exampleCell bg-[#3A3A3C]">
									U
								</div>
								<div className="exampleCell">E</div>
							</div>
							<p className="text-base font-light">
								<span className="font-bold">U</span> is not in
								the word in any spot.
							</p>
						</ul>
						<hr></hr>
						<div className="flex flex-row items-center py-4 text-base font-normal">
							<IoIosStats className="h-8 w-8"></IoIosStats>
							<p>
								{/*<Link to={"login"}>Log in</Link> */}or create
								an account to see your stats.
							</p>
						</div>
						<hr></hr>
						<div className="py-4 text-base font-normal">
							A new puzzle is released daily at midnight.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
