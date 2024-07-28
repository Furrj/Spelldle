import GuessCell from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import { type T_GUESS_CATEGORIES } from "../../../../methods/guesses";
import {
	T_CATEGORIES_INFO,
	type T_CATEGORY_INFO,
} from "../../../../methods/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../methods/requests";
import { QUERY_KEYS } from "../../../../utils/consts";

interface IProps {
	categoriesInfoArr: T_CATEGORY_INFO[];
	allCurrentGuessInfo: React.MutableRefObject<T_GUESS_CATEGORIES>;
}

const GuessBox: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: apiRequestMakeGuess,
		onSuccess: (data) => {
			console.log("SUCCESFUL MAKE_GUESS: " + data.data.toString());
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.pastGuesses] });
		},
	});

	const guessCells = (): JSX.Element[] => {
		const elements: JSX.Element[] = [];

		for (const category of props.categoriesInfoArr) {
			elements.push(
				<GuessCell
					key={category.name}
					category_info={category}
					allCurrentGuessInfo={props.allCurrentGuessInfo}
				/>,
			);
		}

		return elements;
	};

	return (
		<div className={styles.root}>
			{guessCells()}
			<button
			// onClick={() => {
			//   mutation.mutate({
			//     allCurrentGuessInfo: props.allCurrentGuessInfo.current,
			//     allCategoriesInfo: props.allCategoriesInfo.current,
			//     accessToken: getUserSessionDataFromStorage().access_token,
			//   });
			// }}
			>
				Submit
			</button>
		</div>
	);
};

export default GuessBox;
