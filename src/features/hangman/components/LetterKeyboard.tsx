import "../../../styles/hangman-components.css";

// QWERTZ-inspired 30-key German layout
const KEYBOARD_ROWS: string[][] = [
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["y", "x", "c", "v", "b", "n", "m", "ß"],
];

export interface LetterKeyboardProps {
    guessedLetters: string[];
    wrongLetters: string[];
    onGuess: (letter: string) => void;
    disabled: boolean;
}

function LetterKeyboard({ guessedLetters, wrongLetters, onGuess, disabled }: LetterKeyboardProps) {
    return (
        <div className="letter-keyboard" role="group" aria-label="Buchstaben eingeben">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="letter-keyboard__row">
                    {row.map((letter) => {
                        const isCorrect = guessedLetters.includes(letter);
                        const isWrong = wrongLetters.includes(letter);
                        const isUsed = isCorrect || isWrong;

                        const keyClass = [
                            "letter-keyboard__key",
                            isCorrect ? "letter-keyboard__key--correct" : "",
                            isWrong ? "letter-keyboard__key--wrong" : "",
                        ]
                            .filter(Boolean)
                            .join(" ");

                        return (
                            <button
                                key={letter}
                                type="button"
                                className={keyClass}
                                onClick={() => onGuess(letter)}
                                disabled={disabled || isUsed}
                                aria-pressed={isUsed}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default LetterKeyboard;
