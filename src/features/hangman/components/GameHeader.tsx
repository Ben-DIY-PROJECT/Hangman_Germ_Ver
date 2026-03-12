import "../../../styles/hangman-components.css";

export interface GameHeaderProps {
    wrongCount: number;
    maxWrong: number;
    onRestart: () => void;
}

function GameHeader({ wrongCount, maxWrong, onRestart }: GameHeaderProps) {
    return (
        <header className="game-header">
            <span className="game-header__errors">
                {wrongCount} / {maxWrong}
            </span>
            <button className="game-header__restart" type="button" onClick={onRestart}>
                Neu starten
            </button>
        </header>
    );
}

export default GameHeader;
