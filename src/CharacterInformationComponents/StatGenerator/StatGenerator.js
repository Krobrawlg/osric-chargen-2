import React, { useContext } from "react";

import CharContext from "../../Store/char-context";

import classes from "./StatGenerator.module.css";

const StatGenerator = (props) => {
  const ctx = useContext(CharContext);

  const genStatHandler = (event) => {
    event.preventDefault();
    ctx.generateStats();
  };

  function generateNormal() {
    ctx.setNumberOfDice(3);
    ctx.setRemoveLowestRoll(false);
  }

  function generateHero() {
    ctx.setNumberOfDice(4);
    ctx.setRemoveLowestRoll(true);
  }

  function customizeHandler() {
    ctx.setCustomizeCharacter(true);
  }

  function downTheLineHandler() {
    ctx.setCustomizeCharacter(false);
  }

  const statGenClasses = ctx.selectionWindowOpen
    ? `${classes.statGenerator} ${classes.hidden}`
    : classes.statGenerator;
  return (
    <div className={statGenClasses}>
      <h1>Generate Your Stats</h1>
      <h2>Dice Roll</h2>
      <form onSubmit={genStatHandler}>
        <div className={classes["radio-box"]}>
          <input
            className={classes["radio-input"]}
            type="radio"
            name="dice-roll"
            value="3d6"
            id="3d6"
            onClick={generateNormal}
          />
          <label className={classes.label} htmlFor="3d6">
            3d6
          </label>
        </div>

        <div className={classes["radio-box"]}>
          <input
            className={classes["radio-input"]}
            type="radio"
            name="dice-roll"
            value="4d6"
            id="4d6"
            onClick={generateHero}
          />
          <label className={classes.label} htmlFor="4d6">
            4d6 Drop Lowest
          </label>
        </div>

        <h2>Stat Distribution</h2>
        <div className={classes["radio-box"]}>
          <input
            className={classes["radio-input"]}
            type="radio"
            name="stats"
            value="in-order"
            id="in-order"
            onClick={downTheLineHandler}
          />
          <label className={classes.label} htmlFor="in-order">
            Down the Line
          </label>
        </div>
        <div className={classes["radio-box"]}>
          <input
            className={classes["radio-input"]}
            type="radio"
            name="stats"
            value="custom"
            id="custom"
            onClick={customizeHandler}
          />
          <label className={classes.label} htmlFor="custom">
            Custom
          </label>
        </div>
        <button className={classes.button}>Roll up a Character</button>
      </form>
      <button className={classes.button} onClick={props.openCharacterList}>
        Saved Characters
      </button>
    </div>
  );
};

export default StatGenerator;
