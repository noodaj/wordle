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
						className="hover:cursor-pointer"
						onClick={() => {
							setModal(!modalState);
						}}
					></IoMdClose>
				</nav>
			</div>
		</div>
	);
};
