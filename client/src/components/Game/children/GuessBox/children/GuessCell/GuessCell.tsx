import styles from "./GuessCell.module.scss";
import { type T_GUESS_CATEGORIES } from "../../../../../../methods/guesses";
import {
  type T_CATEGORY_INFO,
  E_CATEGORY_COMPONENT_TYPE,
} from "../../../../../../methods/categories";
import SingleText from "./children/SingleText/SingleText";
import MultiText from "./children/MultiText/MultiText";

interface IProps {
  categoryInfo: T_CATEGORY_INFO;
}

const GuessCell: React.FC<IProps> = (props) => {
  const component = (): JSX.Element => {
    switch (props.categoryInfo.component_type) {
      case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
        return <SingleText {...props} />;
      case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
        return <MultiText {...props} />;
      case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
        return <div>comp</div>;
      case E_CATEGORY_COMPONENT_TYPE.LEVEL:
        return <div>lvl</div>;
    }
  };

  return (
    <div className={styles.root}>
      <h4>{props.categoryInfo.name}</h4>
      {component()}
    </div>
  );
};

export default GuessCell;
