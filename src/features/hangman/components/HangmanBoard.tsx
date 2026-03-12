import "../../../styles/hangman-components.css";

const BODY_PARTS = [
    <circle key="head" cx="130" cy="65" r="15" stroke="currentColor" strokeWidth="3" fill="none" />,
    <line key="body" x1="130" y1="80" x2="130" y2="130" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
    <line key="left-arm" x1="130" y1="95" x2="100" y2="115" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
    <line key="right-arm" x1="130" y1="95" x2="160" y2="115" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
    <line key="left-leg" x1="130" y1="130" x2="105" y2="160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
    <line key="right-leg" x1="130" y1="130" x2="155" y2="160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
];

export interface HangmanBoardProps {
    wrongCount: number;
}

function HangmanBoard({ wrongCount }: HangmanBoardProps) {
    return (
        <div className="hangman-board">
            <svg
                className="hangman-board__svg"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={`Hangman: ${wrongCount} Fehler`}
            >
                {/* Galgen — immer sichtbar */}
                <line x1="10" y1="190" x2="100" y2="190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="40" y1="190" x2="40" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="40" y1="20" x2="130" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="130" y1="20" x2="130" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

                {BODY_PARTS.slice(0, wrongCount)}
            </svg>
        </div>
    );
}

export default HangmanBoard;
