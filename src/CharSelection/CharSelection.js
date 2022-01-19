import React, { useContext, useState } from "react";

import CharContext from "../Store/char-context";
import StatBox from "../StatBox/StatBox";
import RaceSelectScreen from "../RaceSelectScreen/RaceSelectScreen";
import ClassSelectScreen from "../ClassSelectScreen/ClassSelecScreen";

import classes from "./CharSelection.module.css";

const CharSelector = () => {
  const ctx = useContext(CharContext);

  const [raceSelectOpen, setRaceSelectOpen] = useState(false);
  const [classSelectOpen, setClassSelectOpen] = useState(false);

  function openRaceWindow() {
    setRaceSelectOpen(true);
    setClassSelectOpen(false);
  }

  function openClassWindow() {
    setClassSelectOpen(true);
    setRaceSelectOpen(false);
  }

  const statBlocks = ctx.stats.map((stat) => (
    <StatBox key={stat.name} name={stat.name} value={stat.value} />
  ));

  return (
    <>
      {raceSelectOpen && <RaceSelectScreen />}
      {classSelectOpen && <ClassSelectScreen />}
      {!raceSelectOpen && !classSelectOpen && (
        <>
          <h1>Stats</h1>
          <div className={classes["stat-block-list"]}>{statBlocks}</div>
        </>
      )}
      <button className={classes.button} onClick={openRaceWindow}>
        Select Race
      </button>
      <button className={classes.button} onClick={openClassWindow}>
        Select Class
      </button>
    </>
  );
};

export default CharSelector;
