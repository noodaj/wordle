import words from "./words.txt";

export const boardGrid = [
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
];

const getWords = async () => {
	let set: Set<string> = new Set();
	await fetch(words)
		.then((res) => res.text())
		.then((res) => {
			const words = res.split("\n");
			set = new Set(words);
		});

	return set;
};

let set: Set<string> = new Set();
await getWords().then((res) => {
	set = res;
});

export const getDaily = (): string => {
	return [...set][Math.floor(Math.random() * 5)];
};

export const checkWord = (word: string): boolean => {
	if (set.has(word)) {
		return true;
	}

	return false;
};
