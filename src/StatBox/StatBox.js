import { useState, useContext, useEffect } from "react";

import classes from "./StatBox.module.css";

import CharContext from "../Store/char-context";

const StatBox = (props) => {
  // let statBoxClasses;
  // if (!buttonPushed) {
  //   statBoxClasses = classes["stat-box"];
  // } else {
  //   statBoxClasses = `${classes["stat-box"]} ${classes.pushed}`;
  // }
  const ctx = useContext(CharContext);
  const [checkedState, setCheckedState] = useState(false);

  function clickHandler() {
    if (ctx.customizeCharacter) {
      console.log(`Prop stat ${props.stat}`);
      props.functionOnClick(props.stat);
      setCheckedState(true);
    }
  }

  useEffect(() => {
    if (!ctx.originStatSelected) {
      setCheckedState(false);
    }
  }, [ctx.originStatSelected]);

  //this change handler does nothing, but you need a change handler..why?
  function changeHandler() {
    if (!ctx.orignStatSelected) {
      setCheckedState(false);
    }
  }
  return (
    <div className={classes.radio}>
      <input
        className={classes["radio-input"]}
        name="stats"
        type="radio"
        value={props.stat.name}
        id={props.stat.name}
        checked={checkedState}
        onChange={changeHandler}
      />
      <div className={classes["stat-box"]} tabIndex={0} onClick={clickHandler}>
        <label
          htmlFor={props.stat.name}
          className={classes.label}
          onClick={clickHandler}
          classes={classes.label}
        >
          <h2>{props.stat.name}</h2>
          <h3>{props.stat.value}</h3>
        </label>
      </div>
    </div>
  );
};

export default StatBox;
