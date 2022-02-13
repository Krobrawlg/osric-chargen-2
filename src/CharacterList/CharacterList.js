import { useState, useEffect, useContext } from "react";

import classes from "./CharacterList.module.css";
import useFetchData from "../hooks/use-fetch-data";

import CharContext from "../Store/char-context";

import Button from "../UI/Button/Button";

const CharacterList = (props) => {
  const [characterList, setCharacterList] = useState([]);

  const { sendRequest: getCharacterList } = useFetchData(
    "characters",
    setCharacterList
  );

  useEffect(() => {
    getCharacterList();
  }, [getCharacterList]);

  async function deleteCharacter(id) {
    console.log(id);
    const updatedCharacterList = characterList.filter(
      (character) => character._id !== id
    );
    setCharacterList(updatedCharacterList);
    await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });
  }

  const ctx = useContext(CharContext);
  let characterListContent = characterList.map((character) => (
    <tr key={character._id} className={classes.row}>
      <td>{character.name}</td>
      <td>{ctx.capitalizeString(character.race)}</td>
      <td>{ctx.capitalizeString(character.job)}</td>
      <td>
        <button
          className={classes.button}
          onClick={deleteCharacter.bind(null, character._id)}
        >
          Delete Character
        </button>
      </td>
    </tr>
  ));

  return (
    <div className={classes.background}>
      <img
        className={`${classes.img} ${classes.left}`}
        src="/guy-rides-turtle.jpg"
        alt="man_rides_giant_turtle"
      />
      <img
        className={`${classes.img} ${classes.right}`}
        src="/man-woman-and-frog.jpg"
        alt="warrior_woman_and_man_read_scroll_in_front_of_giant_frog"
      />
      <div className={classes.container}>
        <h1>Hall of Heroes</h1>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Race</th>
              <th>Class</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{characterListContent}</tbody>
        </table>
        <Button label={"Exit"} clickHandler={props.exitHandler} />
      </div>
    </div>
  );
};

export default CharacterList;
