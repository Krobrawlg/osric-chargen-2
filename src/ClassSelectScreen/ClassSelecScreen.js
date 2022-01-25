import { useState, useEffect, useContext } from "react";

import classes from "./ClassSelectScreen.module.css";

import useGetData from "../hooks/use-get-data";

import CharContext from "../Store/char-context";

import SelectionBox from "../SelectionBox/SelectionBox";
import SubStatBlock from "../SubStatBlock/SubStatBlock";

const ClassSelectScreen = (props) => {
  const [jobs, setJobs] = useState([]);

  const { sendRequest: getJobs } = useGetData(
    "http://localhost:3000/classes",
    setJobs
  );

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const ctx = useContext(CharContext);

  let headerLabel = "Pick a Class";
  if (ctx.job) {
    const charClass = ctx.capitalizeString(ctx.job.name);
    let charRace = "";
    if (ctx.race) {
      charRace = ctx.capitalizeString(ctx.race.name);
    }
    headerLabel = `You are a ${charRace} ${charClass}`;
  }

  const classListContent = jobs.map((job) => (
    <SelectionBox
      selection={job}
      key={job.id}
      selectFunction={ctx.setJob}
      radioName="class"
    />
  ));

  //refactor this into a component
  //   const statBlock = ctx.stats.map((stat) => (
  //     <div className={classes["stat-box"]} key={stat.name}>
  //       <h2>{stat.name}</h2>
  //       <p>{stat.value}</p>
  //     </div>
  //   ));

  return (
    <>
      <h1>{headerLabel}</h1>
      {props.shopButton}
      <form className={classes["class-list"]}>{classListContent}</form>
      <SubStatBlock />
    </>
  );
};

export default ClassSelectScreen;
