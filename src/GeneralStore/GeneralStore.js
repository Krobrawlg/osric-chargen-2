import { useEffect, useState, useContext, useCallback } from "react";

import useFetchData from "../hooks/use-fetch-data";

import classes from "./GeneralStore.module.css";

import Button from "../UI/Button/Button";
import ShopItem from "../ShopItem/ShopItem";
import Inventory from "../Inventory/Inventory";

import CharContext from "../Store/char-context";
import InvContext from "../Store/inv-context";

const GeneralStore = (props) => {
  const [items, setItems] = useState([]);

  const addGpValue = useCallback((itemArray) => {
    itemArray.forEach((item) => {
      const splitCost = item.cost.split(" ");
      const coinUnit = splitCost[1];
      const numOfCoins = splitCost[0];
      let changeRate;
      if (coinUnit === "gp") {
        changeRate = 1;
      }
      if (coinUnit === "sp") {
        changeRate = 0.1;
      }
      if (coinUnit === "cp") {
        changeRate = 0.01;
      }
      item.gpValue = numOfCoins * changeRate;
      console.log(item.gpValue);
    });
    setItems(itemArray);
  }, []);

  const { sendRequest: getItems } = useFetchData("generalStore", addGpValue);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const ctx = useContext(CharContext);
  const invCtx = useContext(InvContext);
  function generateGold() {
    let gold;
    if (ctx.class === "cleric" || "druid") {
      gold = 180;
    } else if (ctx.class === "fighter" || "ranger" || "paladin") {
      gold = 200;
    } else if (ctx.class === "magic-user" || "illusionist") {
      gold = 80;
    } else {
      gold = 120;
    }
    invCtx.setGold(gold);
  }

  let goldDisplay;
  if (!invCtx.gold) {
    goldDisplay = (
      <Button
        className={classes.button}
        label="Generate Gold"
        clickHandler={generateGold}
      />
    );
  } else {
    goldDisplay = <h2>You have {invCtx.gold} GP</h2>;
  }

  const shopContents = items.map((item) => (
    //make this into a component to manage values individually
    <ShopItem
      key={item._id}
      name={item.Item}
      cost={item.cost}
      weight={item.weight}
      gpValue={item.gpValue}
      hasButton={true}
    />
    // <tr key={item._id}>
    //   <td>{item.Item}</td>
    //   <td>{item.cost}</td>
    //   <td>{item.weight}</td>
    //   <td>
    //     <input type="number" value={enteredNumber} onChange={onChangeHandler} />
    //   </td>
    //   <td>
    //     <button>Buy</button>
    //   </td>
    //   <td>{item.gpValue}</td>
    // </tr>
    // <ItemBox key={item._id} itemName={item.Item} itemCost={item.cost} />
  ));
  return (
    <div className={classes.background}>
      <h1>General Store</h1>
      {goldDisplay}
      <div className={classes["item-list-container"]}>
        <div className={classes["shop-item-list"]}>
          <table className={classes["item-table"]}>
            <thead className={classes["table-header"]}>
              <tr>
                <th></th>
                <th></th>
                <th>
                  <h3 className={classes.h3}>Wares</h3>
                </th>
                <th></th>
                <th></th>
              </tr>
              <tr className={classes.tr}>
                <th>Item</th>
                <th>Cost</th>
                <th>Weight</th>
                <th>Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{shopContents}</tbody>
          </table>
        </div>
        <Inventory />
      </div>

      <footer>
        <button onClick={props.exit} className={classes["footer-button"]}>
          Exit
        </button>
      </footer>
    </div>
  );
};

export default GeneralStore;
