import { useState, useContext, useMemo, useRef, useEffect } from "react";
import styles from "./MultiText.module.scss";
import MultiTextInput from "./children/MultiTextInput/MultiTextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { type T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import {
  T_PAST_GUESS_CATEGORY,
  translateIdsToValues,
} from "../../../../../../../../types/guesses";

interface IProps {
  categoryInfo: T_CATEGORY_INFO;
  mostRecentGuess: T_PAST_GUESS_CATEGORY;
}

const MultiText: React.FC<IProps> = (props) => {
  const [input, setInput] = useState<string>("");
  const [showRecommendationBox, setShowRecommendationBox] =
    useState<boolean>(false);
  const [guesses, setGuesses] = useState<string[]>([]);

  const remainingRecommendations = useRef<string[]>([
    ...props.categoryInfo.values,
  ]);

  const guessData = useContext(CtxGuessData);

  const hasValidInput: boolean = useMemo(() => {
    for (const guess of guesses) {
      if (guess.toLowerCase() === input.toLowerCase()) return false;
    }

    return props.categoryInfo.value_id_map.has(input.toLowerCase());
  }, [input]);

  function removeGuessFromRemainingRecommendations(guess: string): void {
    remainingRecommendations.current = remainingRecommendations.current.filter(
      (value) => value.toLowerCase() !== guess.toLowerCase(),
    );
  }

  function addGuessToRemainingValues(guess: string): void {
    remainingRecommendations.current.push(guess);
  }

  function updateGuessCategoriesMap(): void {
    if (guessData !== null) {
      const mapArr: number[] = [];

      for (const guess of guesses) {
        const valueId = props.categoryInfo.value_id_map.get(
          guess.toLowerCase(),
        );
        if (valueId !== undefined) {
          mapArr.push(valueId);
        }
      }

      guessData.current.set(props.categoryInfo.id, mapArr.sort());
    }
  }

  useEffect(() => {
    updateGuessCategoriesMap();
  }, [guesses]);

  useEffect(() => {
    if (Array.isArray(props.mostRecentGuess.value)) {
      const guesses: string[] = translateIdsToValues(
        props.mostRecentGuess.value,
        props.categoryInfo,
      ) as string[];

      setGuesses(guesses);

      guesses.forEach((guess) => removeGuessFromRemainingRecommendations(guess));
    }
  }, [props.mostRecentGuess.value]);

  return (
    <div className={styles.root}>
      <div>
        {guesses.map((guess) => {
          {
            /*TODO: remove to own component and style*/
          }
          return (
            <div key={guess}>
              {guess}
              <button
                onClick={() => {
                  setGuesses(guesses.filter((g) => g !== guess));
                  addGuessToRemainingValues(guess);
                }}
              >
                -
              </button>
            </div>
          );
        })}
      </div>
      <MultiTextInput
        input={input}
        setInput={setInput}
        hasValidInput={hasValidInput}
        showRecommendationBox={showRecommendationBox}
        setShowRecommendationBox={setShowRecommendationBox}
        setGuesses={setGuesses}
        removeGuessFromRemainingValues={removeGuessFromRemainingRecommendations}
      />
      {showRecommendationBox && (
        <RecommendationBox
          values={remainingRecommendations.current}
          input={input}
          setInput={setInput}
        />
      )}
    </div>
  );
};

export default MultiText;
