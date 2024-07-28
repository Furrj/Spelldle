import styles from "./RecommendationBox.module.scss";
import { useMemo } from "react";

interface IProps {
	values: string[];
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
}

const RecommendationBox: React.FC<IProps> = (props) => {
	const recommendations: string[] = useMemo(() => {
		let matches: string[] = [];

		if (props.input === "") matches = [];
		else {
			matches = props.values.filter((value) =>
				value.toLowerCase().includes(props.input.toLowerCase()),
			);
			
			if (matches.length == 1 && matches[0].toLowerCase() === props.input.toLowerCase()) {
				matches = []
			}
		}

		return matches;
	}, [props.values, props.input]);

	return (
		<>
			{recommendations.length !== 0 && (
				<div className={styles.root}>
					{recommendations.map((value) => {
						return (
							<div
								className={styles.cell}
								key={value}
								onClick={() => {
									// onRecommendationClick(
									// 	value.toString(),
									// 	props.setInputValue,
									// 	props.setRecommendations,
									// );
									props.setInput((input) => value)
								}}
								// Keep focus on text input
								onMouseDown={(e) => e.preventDefault()}
							>
								{value.toString()}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default RecommendationBox;
