export type GameStatus = "idle" | "playing" | "won" | "lost";

export interface HangmanGameState {
    targetWord: string;
    guessedLetters: string[];
    wrongLetters: string[];
    maxWrongGuesses: number;
    status: GameStatus;
}

export interface StartGamePayload {
    targetWord: string;
    maxWrongGuesses?: number;
}

export type GuessOutcome = "already-guessed" | "correct" | "wrong" | "won" | "lost";

export interface GuessResult {
    outcome: GuessOutcome;
    state: HangmanGameState;
}

export type HangmanAction =
    | { type: "START_GAME"; payload: StartGamePayload }
    | { type: "GUESS_LETTER"; payload: { letter: string } }
    | { type: "RESET_GAME" };
