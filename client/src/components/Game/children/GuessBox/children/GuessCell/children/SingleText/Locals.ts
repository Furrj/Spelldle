import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import { T_GUESS_MAP_IDS } from "../../../../../../../../types/guesses";

const Locals = {
	 updateGuessCategoriesMapSingleText: function(
		input: string,
		hasValidInput: boolean,
		categoryInfo: T_CATEGORY_INFO,
		guessData: React.MutableRefObject<T_GUESS_MAP_IDS> | null,
	): void {
		if (guessData !== null) {
			if (hasValidInput) {
				const valueId = categoryInfo.value_id_map.get(input.toLowerCase());
	
				if (valueId !== undefined) {
					guessData.current.set(categoryInfo.id, valueId);
				}
			} else {
				guessData.current.set(categoryInfo.id, -1);
			}
		}
	},
	
	 updateGuessCategoriesMapLevelText: function(
		input: string,
		hasValidInput: boolean,
		categoryInfo: T_CATEGORY_INFO,
		guessData: React.MutableRefObject<T_GUESS_MAP_IDS> | null,
	): void {
		if (guessData !== null) {
			const currentData = guessData.current.get(categoryInfo.id) as
				| number[]
				| undefined;
	
			if (currentData !== undefined) {
				if (hasValidInput) {
					const valueId = categoryInfo.value_id_map.get(input.toLowerCase());
	
					if (valueId !== undefined) {
						guessData.current.set(categoryInfo.id, [valueId, currentData[1]]);
					}
				} else {
					guessData.current.set(categoryInfo.id, [-1, currentData[1]]);
				}
			}
		}
	}
}

export default Locals;