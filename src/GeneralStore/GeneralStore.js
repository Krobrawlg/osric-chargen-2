import { useEffect, useState, useContext, useCallback } from "react";

import useFetchData from "../hooks/use-fetch-data";

import classes from "./GeneralStore.module.css";

import ShopItem from "../ShopItem/ShopItem";
import Inventory from "../Inventory/Inventory";

import InvContext from "../Store/inv-context";

const GeneralStore = (props) => {
  const [items, setItems] = useState([]);

  const modifyItemArray = useCallback((itemArray) => {
    const modifiedItemArray = itemArray.map((item) => {
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
      return {
        id: item._id,
        name: item.Item,
        cost: item.cost,
        weight: item.weight,
        gpValue: numOfCoins * changeRate,
      };
    });
    setItems(modifiedItemArray);
  }, []);

  const { sendRequest: getItems } = useFetchData(
    "generalStore",
    modifyItemArray
  );

  useEffect(() => {
    getItems();
  }, [getItems]);

  const invCtx = useContext(InvContext);

  useCallback(() => {
    invCtx.generateGold();
  }, [invCtx]);

  const shopContents = items.map((item) => (
    <ShopItem key={item.id} item={item} hasButton={true} inInventory={false} />
  ));
  return (
    <div className={classes.background}>
      <h1>General Store</h1>
      <h2>You have {Math.round(invCtx.gold * 100) / 100} GP</h2>{" "}
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
                <th></th>
              </tr>
              <tr className={classes.tr}>
                <th>Item</th>
                <th>Cost</th>
                <th>Weight</th>
                <th>Number</th>
                <th></th>
                <th className={classes["empty-th"]}></th>
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
