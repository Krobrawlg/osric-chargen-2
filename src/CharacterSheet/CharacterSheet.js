import { useContext, useRef, useState } from "react";
// import { useNavigate } from "react-router";

import classes from "./CharacterSheet.module.css";

import CharContext from "../Store/char-context";
import InvContext from "../Store/inv-context";

import StatBox from "../StatBox/StatBox";

const CharacterSheet = (props) => {
  const ctx = useContext(CharContext);

  let charRace = ctx.capitalizeString(ctx.race.name);
  let charClass = ctx.capitalizeString(ctx.job.name);
  let classRace = `${charRace} ${charClass}`;

  const charNameInput = useRef();

  const [character, setCharacter] = useState({
    name: "",
    stats: "",
    race: "",
    job: "",
    inventory: "",
  });

  const invCtx = useContext(InvContext);

  function enterCharName(event) {
    event.preventDefault();
    const enteredName = charNameInput.current.value;

    ctx.setCharacterName(enteredName);
    setCharacter({
      name: enteredName,
      stats: ctx.stats,
      race: ctx.race.name,
      job: ctx.job.name,
      inventory: invCtx.inventory,
    });
  }

  const characterNameSelected = ctx.characterName;

  let nameDisplay;
  if (!characterNameSelected) {
    nameDisplay = (
      <form
        className={classes["name-form"]}
        id="name-form"
        onSubmit={enterCharName}
      >
        <label htmlFor="character-name">Enter Your Character Name</label>
        <input
          className={classes["name-input"]}
          type="text"
          id="character-name"
          ref={charNameInput}
        ></input>
        <button className={classes.button}>Enter</button>
      </form>
    );
  } else {
    nameDisplay = <h2>{ctx.characterName}</h2>;
  }
  let statBlocks;

  statBlocks = ctx.stats.map((stat) => {
    console.log(stat);

    return (statBlocks = (
      <StatBox stat={stat} key={stat.name} functionOnClick={(a) => a} />
    ));
  });

  let inventoryDisplay = invCtx.inventory.map((item) => (
    <tr className={classes.row} key={item.id}>
      <td>{item.name}</td>
      <td>{item.cost}</td>
      <td>{item.weight}</td>
      <td>{item.number}</td>
    </tr>
  ));

  // const navigate = useNavigate();
  async function saveCharacterToDb() {
    const newCharacter = { ...character };
    console.log(character);
    console.log(newCharacter);
    await fetch("http://localhost:4000/characters/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(newCharacter),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  function exitHandler() {
    window.location.reload();
  }

  return (
    <div className={classes.background}>
      <img
        className={`${classes.img} ${classes.right}`}
        src="/redguy.jpg"
        alt="red_guy_grabs_demon"
      />
      <img
        className={`${classes.img} ${classes.left}`}
        src="/fishbridge.jpg"
        alt="old_samurai_meets_fish"
      />
      <div className={classes["character-sheet"]}>
        <h1>Character Sheet</h1>
        {nameDisplay}
        <h1>{classRace}</h1>
        <div className={classes["stat-block-list"]}>{statBlocks}</div>

        <h3 className={classes["inventory-label"]}>Inventory</h3>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
              <th>Weight</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody className={classes["table-body"]}>{inventoryDisplay}</tbody>
        </table>
        <button
          className={`${classes.button} ${classes.save}`}
          onClick={saveCharacterToDb}
        >
          Save Character
        </button>
        <button
          className={`${classes.button} ${classes.exit}`}
          onClick={exitHandler}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default CharacterSheet;

// This function will handle the submission.
// async function onSubmit(e) {
//   e.preventDefault();

//   // When a post request is sent to the create url, we'll add a new record to the database.
//   const newPerson = { ...form };

//   await fetch("http://localhost:5000/record/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newPerson),
//   }).catch((error) => {
//     window.alert(error);
//     return;
//   });

//   setForm({ name: "", position: "", level: "" });
//   navigate("/");
// }
