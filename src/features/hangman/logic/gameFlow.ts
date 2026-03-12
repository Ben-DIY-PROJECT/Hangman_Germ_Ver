import { GERMAN_ALPHABET_30 } from "../data/localWordBank";
import { pickRandomWord, type PickRandomWordOptions } from "./pickRandomWord";
import type {
    GuessResult,
    HangmanGameState,
    StartGamePayload,
} from "../types/hangman.types";

export const DEFAULT_MAX_WRONG_GUESSES = 6;

const GUESSABLE_LETTERS = new Set<string>(GERMAN_ALPHABET_30);

export const IDLE_GAME_STATE: HangmanGameState = {
    targetWord: "",
    guessedLetters: [],
    wrongLetters: [],
    maxWrongGuesses: DEFAULT_MAX_WRONG_GUESSES,
    status: "idle",
};

export interface StartRandomGameOptions extends PickRandomWordOptions {
    maxWrongGuesses?: number;
}

export function createGameState(payload: StartGamePayload): HangmanGameState {
    const targetWord = payload.targetWord.trim();
    const maxWrongGuesses = payload.maxWrongGuesses ?? DEFAULT_MAX_WRONG_GUESSES;

    if (!targetWord) {
        throw new Error("Target word must not be empty.");
    }

    return {
        targetWord,
        guessedLetters: [],
        wrongLetters: [],
        maxWrongGuesses,
        status: "playing",
    };
}

export function createRandomGameState(
    options: StartRandomGameOptions = {}
): HangmanGameState {
    return createGameState({
        targetWord: pickRandomWord(options),
        maxWrongGuesses: options.maxWrongGuesses,
    });
}

export function normalizeGuessLetter(letter: string): string {
    const normalizedLetter = letter.trim().toLocaleLowerCase("de-DE");
    const letterCharacters = [...normalizedLetter];

    if (letterCharacters.length !== 1) {
        throw new Error("Guessed letter must be exactly one character.");
    }

    if (!GUESSABLE_LETTERS.has(normalizedLetter)) {
        throw new Error("Guessed letter must be part of the German keyboard.");
    }

    return normalizedLetter;
}

export function getRequiredLetters(targetWord: string): string[] {
    const normalizedWord = targetWord.toLocaleLowerCase("de-DE");

    return [...new Set([...normalizedWord].filter((letter) => GUESSABLE_LETTERS.has(letter)))];
}

export function hasWon(state: HangmanGameState): boolean {
    const requiredLetters = getRequiredLetters(state.targetWord);

    return requiredLetters.every((letter) => state.guessedLetters.includes(letter));
}

export function guessLetter(
    state: HangmanGameState,
    letter: string
): GuessResult {
    if (state.status === "won") {
        return { outcome: "won", state };
    }

    if (state.status === "lost") {
        return { outcome: "lost", state };
    }

    if (state.status !== "playing") {
        return { outcome: "already-guessed", state };
    }

    const normalizedLetter = normalizeGuessLetter(letter);
    const hasBeenGuessed =
        state.guessedLetters.includes(normalizedLetter) ||
        state.wrongLetters.includes(normalizedLetter);

    if (hasBeenGuessed) {
        return { outcome: "already-guessed", state };
    }

    const normalizedTargetWord = state.targetWord.toLocaleLowerCase("de-DE");

    if (normalizedTargetWord.includes(normalizedLetter)) {
        const nextState: HangmanGameState = {
            ...state,
            guessedLetters: [...state.guessedLetters, normalizedLetter],
        };

        if (hasWon(nextState)) {
            return {
                outcome: "won",
                state: {
                    ...nextState,
                    status: "won",
                },
            };
        }

        return {
            outcome: "correct",
            state: nextState,
        };
    }

    const wrongLetters = [...state.wrongLetters, normalizedLetter];
    const didLose = wrongLetters.length >= state.maxWrongGuesses;

    return {
        outcome: didLose ? "lost" : "wrong",
        state: {
            ...state,
            wrongLetters,
            status: didLose ? "lost" : "playing",
        },
    };
}
