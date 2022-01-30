import { useState, useContext } from "react";

import classes from "./ShopItem.module.css";

import InvContext from "../Store/inv-context";

const ShopItem = (props) => {
  const [numOfItems, setNumOfItems] = useState(1);
  //   const [inventoryItem, setInventoryItem] = useState({
  //     name: props.name,
  //     cost: props.cost,
  //     weight: props.weight,
  //     gpValue: props.gpValue,
  //   });

  function onChangeHandler(event) {
    setNumOfItems(event.target.value);
  }

  const invCtx = useContext(InvContext);

  const item = {
    name: props.name,
    cost: props.cost,
    weight: props.weight,
    gpValue: props.gpValue,
    number: numOfItems,
  };

  const clickHandler = () => {
    invCtx.addItemToCart(item);
    console.log(item);
  };
  return (
    <tr key={props.id} className={classes.row}>
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
        {props.hasButton && (
          <button className={classes.button} onClick={clickHandler}>
            Buy
          </button>
        )}
      </td>
    </tr>
  );
};

export default ShopItem;
