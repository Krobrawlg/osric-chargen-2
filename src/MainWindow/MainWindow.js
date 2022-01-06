import React, {useContext} from "react";

import CharContext from "../Store/char-context";

import StatGenerator from "../StatGenerator/StatGenerator";
import CharSelection from "../CharSelection/CharSelection";

import classes from "./MainWindow.module.css";

const MainWindow = () => {

const ctx = useContext(CharContext);

  return (
    <div className={classes.mainbox}>
      <header className={classes.header}>
        <h1 className={classes.h1}>OSRIC</h1>
        {/* <img className="logo" src="/osric.png" alt="osric_logo" /> */}
      </header>
      {ctx.selectionWindowOpen &&
      <CharSelection />}
      <StatGenerator />
    </div>
  );
};

export default MainWindow;
