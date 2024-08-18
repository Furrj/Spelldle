import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { getUserSessionDataFromStorage } from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../types/requests";
import { useEffect, useMemo, useRef, useState } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
  E_CATEGORY_COMPONENT_TYPE,
  type T_CATEGORY_INFO,
  type T_CATEGORY_INFO_SEED_JSON,
  generateCategoryInfoFromSeedJSON,
  generateGuessesStateFromJSON,
} from "../../types/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import CtxGuessData from "../../contexts/CtxGuessData";
import CtxGuessCellsState from "../../contexts/CtxGuessCellsState";
import ResultBox from "./children/ResultBox/ResultBox";
import {
  E_RESULT_OPTIONS,
  T_GUESSES_AS_IDS,
  T_PAST_GUESS,
} from "../../types/guesses";
import { I_GUESS_CELL_STATE } from "./children/GuessBox/children/GuessCell/GuessCell";

const Game: React.FC = () => {
  const categoriesInfo: T_CATEGORY_INFO[] = useMemo(() => {
    return generateCategoryInfoFromSeedJSON(
      CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
    );
  }, []);
  const currentGuessInfo = useRef<T_GUESSES_AS_IDS>(
    generateGuessesStateFromJSON(
      CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
    ),
  );
  const [guessCellsState, setGuessCellsState] = useState<
    Map<string, I_GUESS_CELL_STATE>
  >(initGuessCellsStateMap(CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON));

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.pastGuesses],
    queryFn: () =>
      apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
  });

  // if (isSuccess && data.data.guesses.length > 0) {
  //   console.log(JSON.stringify(data.data));
  // }

  useEffect(() => {
    console.log("Running useEffect")
    if (isSuccess && data.data.guesses.length > 0) {
      setGuessCellsState((state) => updateGuessCellsStateMap(
        CATEGORY_INFO_JSON,
        data.data.guesses[data.data.guesses.length - 1],
      ));
    }
  }, [isSuccess, isFetching]);

  function initGuessCellsStateMap(
    categoryInfoJson: T_CATEGORY_INFO_SEED_JSON,
  ): Map<string, I_GUESS_CELL_STATE> {
    const map = new Map();

    for (const { id, component_type } of categoryInfoJson) {
      let guessCellState: I_GUESS_CELL_STATE;

      switch (component_type) {
        case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
          guessCellState = {
            input: "",
            result: E_RESULT_OPTIONS.UNINITIALIZED,
          };
          break;
        case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
        case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
          guessCellState = {
            input: [],
            result: E_RESULT_OPTIONS.UNINITIALIZED,
          };
          break;
        case E_CATEGORY_COMPONENT_TYPE.LEVEL:
          guessCellState = {
            input: { level: "", is_ritual: false },
            result: E_RESULT_OPTIONS.UNINITIALIZED,
          };
          break;
      }

      map.set(id, guessCellState);
    }

    return map;
  }

  function updateGuessCellsStateMap(
    categoryInfoJson: T_CATEGORY_INFO_SEED_JSON,
    pastGuess: T_PAST_GUESS,
  ): Map<string, I_GUESS_CELL_STATE> {
    const map = new Map();

    for (const { id } of categoryInfoJson) {
      const guessMap: T_PAST_GUESS = new Map(Object.entries(pastGuess))
      const guess = guessMap.get(id);
      if (guess !== undefined) {
        map.set(id, {
          input: "",
          result: guess?.result
        })
      }
    }

    return map;
  }

  return (
    <>
      <CtxGuessData.Provider value={currentGuessInfo}>
        <CtxGuessCellsState.Provider
          value={{ state: guessCellsState, setState: setGuessCellsState }}
        >
          <GuessInfoButton />
          {data != undefined && data.data.guesses.length > 0 && (
            <ResultBox
              pastGuesses={data.data.guesses}
              categoriesInfoArr={categoriesInfo}
            />
          )}
          <GuessBox categoriesInfoArr={categoriesInfo} />
        </CtxGuessCellsState.Provider>
      </CtxGuessData.Provider>
    </>
  );
};

export default Game;
