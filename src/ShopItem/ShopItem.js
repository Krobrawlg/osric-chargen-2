import { useState, useContext } from "react";

import classes from "./ShopItem.module.css";

import InvContext from "../Store/inv-context";

const ShopItem = (props) => {
  const [number, setNumber] = useState(1);

  const invCtx = useContext(InvContext);

  const item = {
    id: props.item.id,
    name: props.item.name,
    cost: props.item.cost,
    weight: props.item.weight,
    gpValue: props.item.gpValue,
    number: number,
  };

  function changeHandler(event) {
    setNumber(event.target.value);
    console.log(item.number);
  }

  function clickHandler() {
    console.log(item);
    invCtx.addItem(item);
  }

  function removeHandler() {
    invCtx.removeItem(item);
  }

  function addHandler() {
    invCtx.addItem({ ...item, number: 1 });
  }

  return (
    <tr className={classes.row}>
      <td>{item.name}</td>
      <td>{item.cost}</td>
      <td>{item.weight}</td>
      {props.inInventory ? (
        <>
          <td>
            <button onClick={removeHandler}>-</button>
          </td>
          <td>{props.numOfItems}</td>
          <td>
            <button onClick={addHandler}>+</button>
          </td>
        </>
      ) : (
        <>
          <td>
            <input
              className={classes.input}
              type="number"
              min={1}
              onChange={changeHandler}
              value={number}
            />
          </td>
          <td />
        </>
      )}
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
