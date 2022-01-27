import { useState } from "react";

import classes from "./ShopItem.module.css";

const ShopItem = (props) => {
  const [numOfItems, setNumOfItems] = useState(1);

  function onChangeHandler(event) {
    setNumOfItems(event.target.value);
  }

  return (
    <tr key={props.id}>
      <td>{props.name}</td>
      <td>{props.cost}</td>
      <td>{props.weight}</td>
      <td>
        <input
          className={classes.input}
          type="number"
          value={numOfItems}
          onChange={onChangeHandler}
          min={1}
        />
      </td>
      <td>
        <button className={classes.button}>Buy</button>
      </td>
    </tr>
  );
};

export default ShopItem;
