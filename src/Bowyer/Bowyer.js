import { useState, useCallback, useEffect, useContext } from "react";

import classes from "./Bowyer.module.css";

import ShopDisplay from "../ShopDisplay/ShopDisplay";
import Inventory from "../Inventory/Inventory";

import useFetchData from "../hooks/use-fetch-data";

import InvContext from "../Store/inv-context";

const Bowyer = (props) => {
  const [missileItems, setmissileItems] = useState([]);

  const modifyMissileList = useCallback((missileArray) => {
    //make this a hook?
    const modifiedMissileArray = missileArray.map((missile) => {
      const splitCost = missile.cost.split(" ");
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

      const weightValue = missile.encumbrance;
      console.log(weightValue);
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

      console.log(missile[`weapon type`]);
      return {
        id: missile._id,
        name: missile[`weapon type`],
        cost: missile.cost,
        weight: missile.encumbrance,
        gpValue: numOfCoins * changeRate,
        trueWeight: trueWeight,
      };
    });
    const sortedArray = modifiedMissileArray.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setmissileItems(sortedArray);
  }, []);

  const { sendRequest: getmissiles } = useFetchData(
    "missileWeapons",
    modifyMissileList
  );

  useEffect(() => {
    getmissiles();
  }, [getmissiles]);

  const invCtx = useContext(InvContext);

  return (
    <div className={classes.background}>
      <h1>Bowyer</h1>
      <h2>You have {Math.round(invCtx.gold * 100) / 100} GP</h2>
      <div className={classes["item-list-container"]}>
        <ShopDisplay items={missileItems} exit={props.exit} />
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
export default Bowyer;
