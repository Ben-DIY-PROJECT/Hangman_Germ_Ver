import { GERMAN_WORD_BANK } from "../data/localWordBank";

export interface PickRandomWordOptions {
	wordBank?: readonly string[];
	random?: () => number;
}

export function pickRandomWord(options: PickRandomWordOptions = {}): string {
	const { wordBank = GERMAN_WORD_BANK, random = Math.random } = options;

	if (wordBank.length === 0) {
		throw new Error("Cannot pick a random word from an empty word bank.");
	}

	const randomIndex = Math.floor(random() * wordBank.length);

	return wordBank[randomIndex];
}
