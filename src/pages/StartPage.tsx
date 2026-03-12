import "../styles/start-page.css";

export interface StartPageProps {
	onStartGame: () => void;
}

function StartPage({ onStartGame }: StartPageProps) {
	return (
		<main className="start-page">
			<h1 className="start-page__title">Hangman</h1>
			<button className="start-page__button" type="button" onClick={onStartGame}>
				Start
			</button>
		</main>
	);
}

export default StartPage;
