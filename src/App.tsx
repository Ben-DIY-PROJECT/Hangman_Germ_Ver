import { useReducer, useCallback } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import { hangmanReducer, createIdleGameState } from "./features/hangman/logic/gameReducer";
import { createRandomGameState } from "./features/hangman/logic/gameFlow";

function App() {
    const [state, dispatch] = useReducer(hangmanReducer, undefined, createIdleGameState);

    const handleStartGame = useCallback(() => {
        const newState = createRandomGameState();
        dispatch({ type: "START_GAME", payload: { targetWord: newState.targetWord } });
    }, []);

    const handleGuess = useCallback((letter: string) => {
        dispatch({ type: "GUESS_LETTER", payload: { letter } });
    }, []);

    const handleRestart = useCallback(() => {
        //dispatch({ type: "START_GAME"，下面这样能不跳回原来home界面。（除非刷新）
        const newState = createRandomGameState();
        dispatch({ type: "START_GAME", payload: { targetWord: newState.targetWord } });
    }, []);

    const handleHome = useCallback(() => {
        dispatch({ type: "RESET_GAME" });
    }, []);

    if (state.status === "idle") {
        return <StartPage onStartGame={handleStartGame} />;
    }

    return (
        <GamePage
            state={state}
            onGuess={handleGuess}
            onRestart={handleRestart}
            onHome={handleHome}
        />
    );
}

export default App;
