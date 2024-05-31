import CATEGORY_INFO from "../CATEGORY_INFO";
import {
	T_SINGLE_CATEGORY_POSSIBILITIES,
	T_SPELL_INFO,
	T_USER_SESSION_DATA,
	initUserSessionData,
	T_VALIDATE_SESSION_RESULT,
	initValidateSessionResult,
} from "../types";
import { requestValidateSession } from "./requests";
import TextInput from "../components/TurnBox/children/TurnCell/children/TextInput/TextInput";
import LevelRitualToggle from "../components/TurnBox/children/TurnCell/children/LevelRitualToggle/LevelRitualToggle";
import ComponentsSelection from "../components/TurnBox/children/TurnCell/children/ComponentsSelection/ComponentsSelection";

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
	setAllCurrentGuessInfo: React.Dispatch<React.SetStateAction<T_SPELL_INFO>>
): JSX.Element {
	const singleInput = (
		<TextInput
			category={category}
			multi={false}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={category.values}
			setRecommendations={setRecommendations}
			setAllCurrentGuessInfo={setAllCurrentGuessInfo}
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
			setAllCurrentGuessInfo={setAllCurrentGuessInfo}
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
					<LevelRitualToggle setAllCurrentGuessInfo={setAllCurrentGuessInfo} />
					{singleInput}
				</>
			);
			break;
		case CATEGORY_INFO.COMPONENTS:
			return (
				<ComponentsSelection setAllCurrentGuessInfo={setAllCurrentGuessInfo} />
			);
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

// Storage
export function isSessionIdInLocalStorage(): boolean {
	return !(
		localStorage.getItem("session_key") === null ||
		localStorage.getItem("session_key") === ""
	);
}

export function getUserSessionDataFromStorage(): T_USER_SESSION_DATA {
	const sessionInfo: T_USER_SESSION_DATA = { ...initUserSessionData };

	try {
		sessionInfo.user_id = parseInt(localStorage.getItem("user_id") || "-1");
		sessionInfo.session_key = localStorage.getItem("session_key") || "";
		if (sessionInfo.user_id === -1 || sessionInfo.session_key === "")
			throw new Error("Session Data Was Not Found");
		return sessionInfo;
	} catch (err: any) {
		throw new Error(`Error in getUserSessionDataFromStorage: ${err}`);
	}
}

export function sendToLocalStorage(sessionInfo: T_USER_SESSION_DATA) {
	localStorage.setItem("user_id", String(sessionInfo.user_id));
	localStorage.setItem("session_key", sessionInfo.session_key);

	console.log("Sent to localStorage: ");
	console.log(`user_id: ${localStorage.getItem("user_id")}`);
	console.log(`session_key: ${localStorage.getItem("session_key")}`);
}

// Auth
export async function checkValidSession(): Promise<T_VALIDATE_SESSION_RESULT> {
	const invalidResult: T_VALIDATE_SESSION_RESULT = {
		...initValidateSessionResult,
	};

	if (!isSessionIdInLocalStorage()) return invalidResult;

	try {
		return await requestValidateSession(getUserSessionDataFromStorage());
	} catch (err: any) {
		throw new Error(err);
	}
}