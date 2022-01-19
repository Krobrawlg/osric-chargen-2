import React, { useContext } from "react";

import CharContext from "../Store/char-context";

import classes from "./StatGenerator.module.css";

const StatGenerator = () => {
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
  //review: stat-generator..statGenerator?
  const statGenClasses = ctx.selectionWindowOpen
    ? `${classes.statGenerator} ${classes.hidden}`
    : classes.statGenerator;
  return (
    <div className={statGenClasses}>
      <h1>Generate Your Stats</h1>
      <h2>Dice Roll</h2>
      <form onSubmit={genStatHandler}>
        <div>
          <input
            type="radio"
            name="dice-roll"
            value="3d6"
            onClick={generateNormal}
          />
          <label>3d6</label>
        </div>

        <div>
          <input
            type="radio"
            name="dice-roll"
            value="4d6"
            onClick={generateHero}
          />
          <label>4d6 drop lowest</label>
        </div>

        <h2>Stat Distribution</h2>
        <div>
          <input type="radio" name="stats" value="in-order" />
          <label>Down the line</label>
        </div>
        <div>
          <input type="radio" name="stats" value="custom" />
          <label>Custom</label>
        </div>
        {!ctx.isLoading && (
          <button className={classes.button}>Roll up a character</button>
        )}
        {ctx.isLoading && <p>Rolling...</p>}
      </form>
    </div>
  );
};

export default StatGenerator;
