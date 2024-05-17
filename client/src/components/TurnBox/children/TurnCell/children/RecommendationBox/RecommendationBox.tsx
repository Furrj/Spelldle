import styles from "./RecommendationBox.module.scss";
import * as methods from "../../methods";

interface IProps {
	recommendations: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const RecommendationBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			{props.recommendations.map((option) => {
				return (
					<div
						className={styles.cell}
						key={option.toString()}
						onClick={() => {
							methods.onRecommendationClick(
								option.toString(),
								props.setInputValue,
								props.setRecommendations
							);
						}}
						// Keep focus on text input
						onMouseDown={(e) => e.preventDefault()}
					>
						{option.toString()}
					</div>
				);
			})}
		</div>
	);
};

export default RecommendationBox;