import styles from "./MultiTextInput.module.scss";

interface IProps {
	IInput: {
		input: string;
		setInput: React.Dispatch<React.SetStateAction<string>>;
		hasValidInput: boolean;
	};
	IRecommendations: {
		showRecommendationBox: boolean;
		setShowRecommendationBox: React.Dispatch<React.SetStateAction<boolean>>;
		remainingReccomendations: React.MutableRefObject<string[]>;
	};
	IGuesses: {
		guess: string;
		setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
	};
	IMethods: {
		removeGuessFromRemainingRecommendations: (
			guess: string,
			remainingRecommendations: React.MutableRefObject<string[]>,
		) => void;
	};
}

const MultiTextInput: React.FC<IProps> = (props) => {
	function addGuessToGuessesBox(guess: string) {
		props.IGuesses.setGuesses((guesses) => [...guesses, guess].sort());
		props.IInput.setInput("");
	}

	return (
		<div className={styles.root}>
			<input
				type="text"
				name="guess"
				value={props.IInput.input}
				onChange={(e) => props.IInput.setInput(e.target.value)}
				onClick={() =>
					!props.IRecommendations.showRecommendationBox &&
					props.IRecommendations.setShowRecommendationBox(true)
				}
				onBlur={() =>
					props.IRecommendations.showRecommendationBox &&
					props.IRecommendations.setShowRecommendationBox(false)
				}
				autoComplete="false"
			/>
			{true && (
				<button
					onClick={() => {
						addGuessToGuessesBox(props.IInput.input);
						props.IMethods.removeGuessFromRemainingRecommendations(
							props.IGuesses.guess,
							props.IRecommendations.remainingReccomendations,
						);
					}}
				>
					+
				</button>
			)}
		</div>
	);
};

export default MultiTextInput;
