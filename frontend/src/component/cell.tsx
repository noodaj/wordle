import { FC, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BoardContext } from "../App";

interface CellProps {
	letter: string;
	r: number;
	c: number;
}

export const Cell: FC<CellProps> = ({ letter, r, c }) => {
	const { board, index, actualWord } = useContext(BoardContext);

	const correctLetter = letter != "" && letter === actualWord[c];
	const hasLetter = letter != "" && actualWord.includes(letter);
	let color = "";

	if (index.row > r || (index.row == 5 && index.col == 6)) {
		if (hasLetter && !correctLetter) {
			color = "bg-[#B59F3B]";
		}
		if (correctLetter && hasLetter) {
			color = "bg-[#538D4E]";
		}
		if (!correctLetter && !hasLetter && letter != "") {
			color = "bg-[#3A3A3C]";
		}
	}

	return (
		<>
			{board[r].join("").length === 5 &&
			index.col === 0 &&
			r + 1 === index.row ? (
				<motion.div
					variants={{
						hidden: { rotateX: 0 },
						visible: () => ({
							rotateX: 90,
							transition: {
								delay: c * 0.1,
								duration: 0.2,
								repeatType: "mirror",
								repeat: 1,
							},
						}),
					}}
					initial="hidden"
					animate="visible"
					custom={[c]}
					className={`mx-1 flex h-16 w-16 items-center justify-center border-2 text-3xl font-semibold ${color}`}
				>
					{letter}
				</motion.div>
			) : (
				<div
					className={`mx-1 flex h-16 w-16 items-center justify-center border-2 text-3xl font-semibold ${color}`}
				>
					{letter}
				</div>
			)}
		</>
	);
};
