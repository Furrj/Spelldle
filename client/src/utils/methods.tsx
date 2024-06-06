import {
	type T_SINGLE_CATEGORY_POSSIBILITIES,
	type T_SPELL_INFO,
	type T_USERDATA_TOKENS,
	INIT_USERDATA_TOKENS,
	type T_USERDATA_STATE,
	INIT_USERDATA_STATE,
	type T_APIRESULTS,
	type T_APIREQUEST_MAKE_GUESS,
	INIT_APIREQUEST_MAKE_GUESS,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../types";
import TextInput from "../components/TurnBox/children/TurnCell/children/TextInput/TextInput";
import LevelRitualToggle from "../components/TurnBox/children/TurnCell/children/LevelRitualToggle/LevelRitualToggle";
import ComponentsSelection from "../components/TurnBox/children/TurnCell/children/ComponentsSelection/ComponentsSelection";
import { LOCAL_STORAGE_TOKENS_KEYS } from "./consts";
import CATEGORY_INFO from "../CATEGORY_INFO.json";

// Multi
export function getRecommendations(e: any, values: string[]): string[] {
	const output: string[] = [];

	for (const option of values) {
		if (option.toLowerCase() === e.target.value.toLowerCase()) {
			return [];
		} else if (option.toLowerCase().includes(e.target.value.toLowerCase())) {
			output.push(option);
		}
	}

	return output;
}

export function onRecommendationClick(
	key: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>
): void {
	setInputValue(key);
	setRecommendations([]);
}

export function deepCopyObject<T extends Object>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

// TurnCell
export function getUniqueItems(
	category: T_SINGLE_CATEGORY_POSSIBILITIES,
	inputValue: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>,
	allCurrentGuessInfo: React.MutableRefObject<T_SPELL_INFO>
): JSX.Element {
	const singleInput = (
		<TextInput
			category={category}
			multi={false}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={category.values}
			setRecommendations={setRecommendations}
			allCurrentGuessInfo={allCurrentGuessInfo}
		/>
	);
	const multiInput = (
		<TextInput
			category={category}
			multi={true}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={category.values}
			setRecommendations={setRecommendations}
			allCurrentGuessInfo={allCurrentGuessInfo}
		/>
	);

	switch (category) {
		case CATEGORY_INFO.SCHOOL:
		case CATEGORY_INFO.CASTING_TIME:
		case CATEGORY_INFO.RANGE:
		case CATEGORY_INFO.TARGET:
			return singleInput;
			break;
		case CATEGORY_INFO.LEVEL:
			return (
				<>
					<LevelRitualToggle allCurrentGuessInfo={allCurrentGuessInfo} />
					{singleInput}
				</>
			);
			break;
		case CATEGORY_INFO.COMPONENTS:
			return <ComponentsSelection allCurrentGuessInfo={allCurrentGuessInfo} />;
			break;
		case CATEGORY_INFO.CLASS:
		case CATEGORY_INFO.EFFECTS:
			return multiInput;
			break;
		default:
			return <></>;
	}
}

// TurnBox
export function createNewSpellInfoMap(): T_SPELL_INFO {
	const map = new Map();
	map.set("School", "");
	map.set("Level", ["", false]);
	map.set("Casting Time", "");
	map.set("Range", "");
	map.set("Target", "");
	map.set("Components", []);
	map.set("Class", []);
	map.set("Effects", []);
	return map;
}

// TextInput
export function onAddGuessClick(
	setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
	inputValue: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>
): void {
	setGuesses((guesses: string[]) => {
		const newArr = [...guesses];
		newArr.push(inputValue);
		return newArr;
	});
	setInputValue("");
}

export function onRemoveGuessClick(
	setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
	guess: string
): void {
	setGuesses((guesses) => {
		return guesses.filter((g: string) => {
			return g.toLocaleLowerCase() !== guess.toLocaleLowerCase();
		});
	});
}

// Login
export function logoutUser(
	setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>
): void {
	clearTokensFromLocalStorage();
	setUserIsLoggedIn(false);
	setUserData(deepCopyObject(INIT_USERDATA_STATE));
}

// Storage
export function areTokensInLocalStorage(): boolean {
	console.log("RUNNING AreTokensInLocalStorage()");
	return (
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.access_token) !== null &&
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token) !== null &&
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.access_token) !== "" &&
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token) !== ""
	);
}

export function getUserSessionDataFromStorage(): T_USERDATA_TOKENS {
	const userDataTokens: T_USERDATA_TOKENS = { ...INIT_USERDATA_TOKENS };

	try {
		userDataTokens.access_token =
			localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.access_token) || "";
		userDataTokens.refresh_token =
			localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token) || "";
		return userDataTokens;
	} catch (err: any) {
		throw new Error(`Error in getUserSessionDataFromStorage: ${err}`);
	}
}

export function sendTokensToLocalStorage(userDataTokens: T_USERDATA_TOKENS) {
	localStorage.setItem(
		LOCAL_STORAGE_TOKENS_KEYS.access_token,
		userDataTokens.access_token
	);
	localStorage.setItem(
		LOCAL_STORAGE_TOKENS_KEYS.refresh_token,
		userDataTokens.refresh_token
	);

	console.log("Sent to localStorage: ");
	console.log(
		`${LOCAL_STORAGE_TOKENS_KEYS.access_token}: ${userDataTokens.access_token}`
	);
	console.log(
		`${LOCAL_STORAGE_TOKENS_KEYS.refresh_token}: ${userDataTokens.refresh_token}`
	);
}

export function clearTokensFromLocalStorage() {
	console.log("CLEARING TOKENS FROM LOCALSOTRAGE");
	localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.access_token);
	localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token);
}

// Data
export function createUserDataStateFromApiResult(
	apiResult: T_APIRESULTS
): T_USERDATA_STATE {
	return {
		user_id: apiResult.user_id,
		user_data_account: apiResult.user_data_account,
		user_data_personal: apiResult.user_data_personal,
	};
}

export function setUserDataFromAPIResult(
	data: T_APIRESULTS,
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>,
	setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
	setEnableQueryFn: React.Dispatch<React.SetStateAction<boolean>>
): void {
	console.log(
		`Setting userData: ${JSON.stringify(
			createUserDataStateFromApiResult(data)
		)}`
	);
	setUserData(createUserDataStateFromApiResult(data));
	setUserIsLoggedIn(true);
	setEnableQueryFn(false);
}

export function createRequestObjectFromCurrentGuessInfo(
	currentGuessInfo: T_SPELL_INFO
): T_APIREQUEST_MAKE_GUESS {
	const requestObject: T_APIREQUEST_MAKE_GUESS = deepCopyObject(
		INIT_APIREQUEST_MAKE_GUESS
	);

	return requestObject;
}

// export function createInitalCurrentGuessInfoObject(): T_SPELL_INFO {
// 	const currentGuessInfoObject =
// }

function createMapFromValues(arr: string[]) {
	const map = new Map();
	arr.forEach((item: string, index: number) => {
		map.set(item.toLowerCase(), index);
	});
	return map;
}

export function getAllCategoriesInfo(): T_ALL_POSSIBLE_CATEGORIES_INFO {
	const infoObj: T_ALL_POSSIBLE_CATEGORIES_INFO =
		CATEGORY_INFO as T_ALL_POSSIBLE_CATEGORIES_INFO;

	infoObj.SCHOOL.id_map = createMapFromValues(infoObj.SCHOOL.values);
	infoObj.LEVEL.id_map = createMapFromValues(infoObj.LEVEL.values);
	infoObj.CASTING_TIME.id_map = createMapFromValues(
		infoObj.CASTING_TIME.values
	);
	infoObj.RANGE.id_map = createMapFromValues(infoObj.RANGE.values);
	infoObj.COMPONENTS.id_map = createMapFromValues(infoObj.COMPONENTS.values);
	infoObj.DURATION.id_map = createMapFromValues(infoObj.DURATION.values);
	infoObj.CLASS.id_map = createMapFromValues(infoObj.CLASS.values);
	infoObj.EFFECTS.id_map = createMapFromValues(infoObj.EFFECTS.values);

	return infoObj;
}
