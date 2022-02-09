import { useState, useCallback, useEffect, useContext } from "react";

import classes from "./GeneralStore.module.css";

import ShopDisplay from "../ShopDisplay/ShopDisplay";
import Inventory from "../Inventory/Inventory";

import InvContext from "../Store/inv-context";

import useFetchData from "../hooks/use-fetch-data";

const GeneralStore = (props) => {
  const [generalStoreItems, setGeneralStoreItems] = useState([]);

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

      let trueWeight;

      const weightValue = item.weight;
      const weightString = weightValue.toString();
      const splitWeight = weightString.split(" ");
      const splitValue = splitWeight[0];
      if (splitValue === "1/2") {
        trueWeight = 0.5;
      } else if (!isNaN(splitValue)) {
        trueWeight = Number(splitValue);
      } else {
        trueWeight = 0;
      }

      console.log(trueWeight);

      return {
        id: item._id,
        name: item.Item,
        cost: item.cost,
        weight: item.weight,
        gpValue: numOfCoins * changeRate,
        trueWeight: trueWeight,
      };
    });
    setGeneralStoreItems(modifiedItemArray);
  }, []);

  const { sendRequest: getItems } = useFetchData(
    "generalStore",
    modifyItemArray
  );

  useEffect(() => {
    getItems();
  }, [getItems]);

  const invCtx = useContext(InvContext);

  return (
    <div className={classes.background}>
      <h1>General Store</h1>
      <h2>You have {Math.round(invCtx.gold * 100) / 100} GP</h2>
      <div className={classes["item-list-container"]}>
        <ShopDisplay exit={props.exit} items={generalStoreItems} />
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
