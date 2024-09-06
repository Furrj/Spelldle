import styles from "./Game.module.scss";
import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
	clearTokensFromLocalStorage,
	getUserSessionDataFromStorage,
} from "../../utils/methods";
import { apiRequestGetGameSessionInfo } from "../../utils/requests";
import { useMemo, useRef, useState } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
	type T_CATEGORY_INFO,
	type T_CATEGORY_INFO_SEED_JSON,
	generateCategoryInfoFromSeedJSON,
	generateGuessesStateFromJSON,
} from "../../types/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import CtxGuessData from "../../contexts/CtxGuessData";
import ResultBox from "./children/ResultBox/ResultBox";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../../types/guesses";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import GuessSpell from "./children/GuessSpell/GuessSpell";
import PostGame from "./children/PostGame/PostGame";

interface IProps {
	showingPostGame: boolean;
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const Game: React.FC<IProps> = (props) => {
	const categoriesInfo: T_CATEGORY_INFO[] = useMemo(() => {
		return generateCategoryInfoFromSeedJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
		);
	}, [CATEGORY_INFO_JSON]);
	const currentGuessInfo = useRef<T_GUESS_CATEGORIES_IDS_MAP>(
		generateGuessesStateFromJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
		),
	);
	const navigate = useNavigate();

	const { data, isFetching, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.gameSessionInfo],
		queryFn: () =>
			apiRequestGetGameSessionInfo(
				getUserSessionDataFromStorage().access_token,
			),
		retry: false,
	});

	if (isFetching) {
		return <Loading />;
	} else if (isSuccess && data) {
		return (
			<div className={styles.root}>
				<CtxGuessData.Provider value={currentGuessInfo}>
					{props.showingPostGame && (
						<PostGame setShowingPostGame={props.setShowingPostGame} />
					)}
					<GuessInfoButton />
					<GuessSpell
						spells={data.spells}
						numGuesses={data.guesses.spells.length}
						setShowingPostGame={props.setShowingPostGame}
					/>
					<GuessBox
						categoriesInfoArr={categoriesInfo}
						mostRecentGuess={
							data.guesses.categories.length > 0
								? data.guesses.categories[data.guesses.categories.length - 1]
								: null
						}
						numGuesses={{
							category: data.guesses.categories.length,
							spell: data.guesses.spells.length,
						}}
					/>
					{data.guesses.categories.length > 0 && (
						<ResultBox
							pastGuesses={data.guesses.categories}
							categoriesInfoArr={categoriesInfo}
						/>
					)}
				</CtxGuessData.Provider>
			</div>
		);
	} else {
		clearTokensFromLocalStorage();
		navigate("/login");
	}
};

export default Game;
