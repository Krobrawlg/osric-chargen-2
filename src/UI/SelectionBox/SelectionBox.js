import { useContext, useEffect } from "react";

import CharContext from "../../Store/char-context";

import classes from "./SelectionBox.module.css";

const SelectionBox = (props) => {
  const ctx = useContext(CharContext);

  function selectionHandler() {
    props.selectFunction(props.selection);
  }

  useEffect(() => {
    console.log(ctx.job);
  }, [ctx.job]);

  return (
    <div className={classes["selection-box"]}>
      <input
        className={classes["radio-input"]}
        type="radio"
        name={props.radioName}
        value={props.selection.name}
        id={props.selection.name}
        onChange={selectionHandler}
      />
      <label htmlFor={props.selection.name} className={classes.label}>
        {ctx.capitalizeString(props.selection.name)}
      </label>
    </div>
  );
};

export default SelectionBox;
