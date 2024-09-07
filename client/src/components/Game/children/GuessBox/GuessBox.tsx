import styles from "./GuessBox.module.scss";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuessCategory } from "../../../../utils/requests";
import { QUERY_KEYS, USER_ROLES } from "../../../../utils/consts";
import CtxGuessData from "../../../../contexts/CtxGuessData";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
	deepCopyObject,
	getAuthStatus,
	getUserSessionDataFromStorage,
} from "../../../../utils/methods";
import {
	INIT_PAST_GUESS_CATEGORY,
	type T_PAST_GUESS_CATEGORY,
	type T_PAST_GUESS_CATEGORIES_MAP,
} from "../../../../types/guesses";
import GuessCell from "./children/GuessCell/GuessCell";
import Locals from "./Locals";
import GuessCount from "../GuessCount/GuessCount";
// TODO: remove
import devRequests from "../../../DEBUG/GuessInfoButton/devRequests";
import { HttpStatusCode } from "axios";
// END

interface IProps {
	categoriesInfoArr: T_CATEGORY_INFO[];
	mostRecentGuess: T_PAST_GUESS_CATEGORIES_MAP | null;
	numGuesses: { category: number; spell: number };
}

const GuessBox: React.FC<IProps> = (props) => {
	// TODO: remove
	const { data } = useQuery({
		queryKey: [QUERY_KEYS.USER_DATA],
		queryFn: getAuthStatus,
		retry: false,
	});

	const nameRef = useRef<HTMLInputElement>(null);
	// END

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuessCategory,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
			});
		},
	});

	const [triggerGuessDataChange, setTriggerGuessDataChange] =
		useState<boolean>(false);
	const [validForSubmission, setValidForSubmission] = useState<boolean>(false);
	const guessData = useContext(CtxGuessData);

	const nullPastGuessCategory: T_PAST_GUESS_CATEGORY = deepCopyObject(
		INIT_PAST_GUESS_CATEGORY,
	);

	// check for valid submission to render submit button
	useEffect(() => {
		if (guessData) {
			setValidForSubmission(
				Locals.checkForValidToSubmit(
					guessData.current,
					props.categoriesInfoArr,
				),
			);
		}
	}, [triggerGuessDataChange, guessData?.current]);

	return (
		<div className={styles.root}>
			<div className={styles.session_info}>
				<GuessCount
					title={"Category Guesses"}
					capacity={5}
					numGuesses={props.numGuesses.category}
				/>
			</div>
			<div className={styles.guess_cells}>
				{props.categoriesInfoArr.map((category) => {
					if (props.mostRecentGuess !== null) {
						const mostRecentGuess = props.mostRecentGuess.get(category.id);
						if (mostRecentGuess !== undefined)
							return (
								<GuessCell
									key={category.id}
									categoryInfo={category}
									mostRecentGuess={mostRecentGuess}
									setTriggerGuessDataChange={setTriggerGuessDataChange}
								/>
							);
					}
					return (
						<GuessCell
							key={category.id}
							categoryInfo={category}
							mostRecentGuess={nullPastGuessCategory}
							setTriggerGuessDataChange={setTriggerGuessDataChange}
						/>
					);
				})}
			</div>
			{validForSubmission && (
				<div className={styles.submit}>
					<button
						onClick={() => {
							if (guessData !== null) {
								mutation.mutate({
									accessToken: getUserSessionDataFromStorage().access_token,
									guessData: guessData.current,
								});
							}
						}}
					>
						Submit
					</button>
				</div>
			)}
			{/*TODO: remove */}
			{data && data.user_data.role === USER_ROLES.ADMIN && (
				<>
					<button
						onClick={async () => {
							try {
								if (guessData && nameRef.current) {
									const paramObj = {
										accessToken: getUserSessionDataFromStorage().access_token,
										category_info: Object.fromEntries(guessData.current),
										name: nameRef.current.value,
									};
									console.log(paramObj);
									const res = await devRequests.addSpell(paramObj);
									if (res.status === HttpStatusCode.Ok)
										console.log("added spell");
									else console.log("unsuccessful, status " + res.status);
								}
							} catch (error) {
								console.log(error);
							}
						}}
					>
						Add Spell
					</button>
					<input type="text" placeholder="name" ref={nameRef} />
				</>
			)}
			{/*END*/}
		</div>
	);
};

export default GuessBox;
