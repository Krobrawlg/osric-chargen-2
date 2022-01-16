import React, { useContext, useState, useEffect } from "react";

// import { useRouter } from 'next/router';

import CharContext from "../Store/char-context";
import StatBox from "../StatBox/StatBox";
import RaceSelectScreen from "../RaceSelectScreen/RaceSelectScreen";

import classes from "./CharSelection.module.css";

const CharSelector = () => {
  const ctx = useContext(CharContext);

  const [raceSelectOpen, setRaceSelectOpen] = useState(false);

  // function goToSelectRace(){
  //     router.push('./RaceSelect');
  // }

  function openRaceWindow() {
    setRaceSelectOpen(true);
  }

  const statBlocks = ctx.stats.map((stat, index) => (
    <StatBox key={stat.name} name={stat.name} value={stat.value} />
  ));

  useEffect(() => {
    console.log(statBlocks);
  }, []);

  let headerLabel = "stats";
  if (raceSelectOpen) {
    headerLabel = "Pick a Race";
  }
  return (
    <>
      <h1>{headerLabel}</h1>
      {raceSelectOpen && <RaceSelectScreen />}
      {!raceSelectOpen && (
        <div className={classes["stat-block-list"]}>{statBlocks}</div>
      )}
      <button onClick={openRaceWindow}>Select Race</button>
      <button>Select Class</button>
    </>
  );
};

export default CharSelector;
