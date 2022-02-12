import React, { useContext, useState } from "react";

import CharContext from "../Store/char-context";
import InvContext from "../Store/inv-context";

import StatGenerator from "../StatGenerator/StatGenerator";
import CharSelection from "../CharSelection/CharSelection";
import CharacterSheet from "../CharacterSheet/CharacterSheet";

import Button from "../UI/Button/Button";

import classes from "./MainWindow.module.css";

const MainWindow = () => {
  const ctx = useContext(CharContext);
  const invCtx = useContext(InvContext);
  const characterReady = ctx.race && ctx.job && invCtx.inventory.length > 0;

  const [characterSheetOpen, setCharacterSheetOpen] = useState(false);

  function openCharacterSheet() {
    setCharacterSheetOpen(true);
  }

  return (
    <div className={classes.mainbox}>
      <header className={classes.header}>
        <h1 className={classes.h1}>OSRIC</h1>
        {characterReady && (
          <Button
            label={"Finalize Character"}
            clickHandler={openCharacterSheet}
          />
        )}
        {characterSheetOpen && <CharacterSheet />}
      </header>
      {ctx.selectionWindowOpen && <CharSelection />}
      <StatGenerator />
    </div>
  );
};

export default MainWindow;
