import { useEffect, useState, useContext } from "react";

import SelectionBox from "../SelectionBox/SelectionBox";
import SubStatBlock from "../SubStatBlock/SubStatBlock";

import CharContext from "../Store/char-context";

import classes from "./RaceSelectScreen.module.css";

import useFetchData from "../hooks/use-fetch-data";

const RaceSelectScreen = (props) => {
  //get list of races
  const [races, setRaces] = useState([]);

  // useEffect(() => {
  //   async function getRaceList() {
  //     const raceData = await fetch("http://localhost:3000/races");
  //     const raceList = await raceData.json();
  //     setRaces(raceList);
  //     console.log(raceList);
  //   }
  //   getRaceList();
  // }, []);

  const { sendRequest: getRaces } = useFetchData("races", setRaces);

  useEffect(() => {
    getRaces();
  }, [getRaces]);

  const ctx = useContext(CharContext);

  let headerLabel = "Pick a Race";
  if (ctx.race) {
    const charRace = ctx.capitalizeString(ctx.race.name);
    let charClass = "";
    if (ctx.job) {
      charClass = ctx.capitalizeString(ctx.job.name);
    }
    headerLabel = `You are a ${charRace} ${charClass}`;
  }

  const raceListContent = races.map((race) => (
    <SelectionBox
      selection={race}
      // name={race.name}
      key={race._id}
      selectFunction={ctx.setRace}
      radioName="races"
    />
  ));

  //any way to refactor this?
  // const statBlock = ctx.stats.map((stat) => (
  //   <div className={classes["stat-box"]} key={stat.name}>
  //     <h2>{stat.name}</h2>
  //     <p>{stat.value}</p>
  //   </div>
  // ));

  return (
    <>
      <h1>{headerLabel}</h1>
      {props.shopButton}
      <form className={classes["race-list"]}>{raceListContent}</form>
      <SubStatBlock />
      {/* <div className={classes["stat-block"]}>{statBlock}</div> */}
    </>
  );
};

export default RaceSelectScreen;
