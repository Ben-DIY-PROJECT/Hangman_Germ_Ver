import "../styles/game-page.css";
import HangmanBoard from "../features/hangman/components/HangmanBoard";
import LetterKeyboard from "../features/hangman/components/LetterKeyboard";
import { GERMAN_ALPHABET_30 } from "../features/hangman/data/localWordBank";
import type { HangmanGameState } from "../features/hangman/types/hangman.types";

const GUESSABLE = new Set<string>(GERMAN_ALPHABET_30);

export interface GamePageProps {
    state: HangmanGameState;
    onGuess: (letter: string) => void;
    onRestart: () => void;
    onHome: () => void;
}

function WordDisplay({
    targetWord,
    guessedLetters,
}: {
    targetWord: string;
    guessedLetters: string[];
}) {
    return (
        <div className="game-page__word" aria-label="Das Wort">
            {[...targetWord].map((char, index) => {
                const normalized = char.toLocaleLowerCase("de-DE");
                const guessable = GUESSABLE.has(normalized);
                const revealed = guessable && guessedLetters.includes(normalized);

                return (
                    <span
                        key={index}
                        className="game-page__letter"
                        style={{ animationDelay: `${index * 0.045}s` }}
                    >
                        {!guessable || revealed ? char : ""}
                    </span>
                );
            })}
        </div>
    );
}

function GamePage({ state, onGuess, onRestart, onHome }: GamePageProps) {
    const gameOver = state.status === "won" || state.status === "lost";

    return (
        <main className="game-page">
            <div className="game-page__board-area">
                <p className="game-page__error-count">
                    {state.wrongLetters.length} / {state.maxWrongGuesses}
                </p>
                <HangmanBoard wrongCount={state.wrongLetters.length} />
            </div>

            <WordDisplay
                key={state.targetWord}
                targetWord={state.targetWord}
                guessedLetters={state.guessedLetters}
            />

            <LetterKeyboard
                guessedLetters={state.guessedLetters}
                wrongLetters={state.wrongLetters}
                onGuess={onGuess}
                disabled={gameOver}
            />

            <div className="game-page__actions">
                <button
                    className="game-page__restart"
                    type="button"
                    onClick={onHome}
                >
                    Homepage
                </button>
                <button
                    className="game-page__restart"
                    type="button"
                    onClick={onRestart}
                >
                    Neu starten
                </button>
            </div>

            {gameOver && (
                <div className="game-page__overlay">
                    <div className="game-page__result">
                        {state.status === "won" ? (
                            <p className="game-page__result-title game-page__result-title--won">
                                Gewonnen!
                            </p>
                        ) : (
                            <>
                                <p className="game-page__result-title game-page__result-title--lost">
                                    Verloren
                                </p>
                                <p className="game-page__result-word">
                                    Das Wort war: <strong>{state.targetWord}</strong>
                                </p>
                            </>
                        )}
                        <button
                            className="game-page__result-button"
                            type="button"
                            onClick={onRestart}
                        >
                            Nochmal
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default GamePage;

