import { createGameState, guessLetter, IDLE_GAME_STATE } from "./gameFlow";
import type { HangmanAction, HangmanGameState } from "../types/hangman.types";

export function createIdleGameState(): HangmanGameState {
    return {
        ...IDLE_GAME_STATE,
        guessedLetters: [...IDLE_GAME_STATE.guessedLetters],
        wrongLetters: [...IDLE_GAME_STATE.wrongLetters],
    };
}

export function hangmanReducer(
    state: HangmanGameState,
    action: HangmanAction
): HangmanGameState {
    switch (action.type) {
        case "START_GAME":
            return createGameState(action.payload);

        case "GUESS_LETTER":
            return guessLetter(state, action.payload.letter).state;

        case "RESET_GAME":
            return createIdleGameState();

        default: {
            const exhaustiveAction: never = action;

            return exhaustiveAction;
        }
    }
}
