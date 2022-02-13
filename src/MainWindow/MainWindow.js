import React, { useContext, useState } from "react";

import CharContext from "../Store/char-context";
import InvContext from "../Store/inv-context";

import StatGenerator from "../StatGenerator/StatGenerator";
import CharSelection from "../CharSelection/CharSelection";
import CharacterSheet from "../CharacterSheet/CharacterSheet";
import CharacterList from "../CharacterList/CharacterList";

import Button from "../UI/Button/Button";

import classes from "./MainWindow.module.css";

const MainWindow = () => {
  const ctx = useContext(CharContext);
  const invCtx = useContext(InvContext);
  const characterReady = ctx.race && ctx.job && invCtx.inventory.length > 0;

  const [characterSheetOpen, setCharacterSheetOpen] = useState(false);

  function exitResetHandler() {
    window.location.reload();
  }

  function openCharacterSheet() {
    setCharacterSheetOpen(true);
  }

  const [characterListOpen, setCharacterListOpen] = useState(false);
  function openCharacterList() {
    setCharacterListOpen(true);
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
        {characterSheetOpen && (
          <CharacterSheet exitHandler={exitResetHandler} />
        )}
        {characterListOpen && <CharacterList exitHandler={exitResetHandler} />}
      </header>
      {ctx.selectionWindowOpen && <CharSelection />}
      <StatGenerator openCharacterList={openCharacterList} />
    </div>
  );
};

export default MainWindow;
