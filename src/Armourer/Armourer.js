import { useState, useCallback, useEffect, useContext } from "react";

import classes from "./Armourer.module.css";

import ShopDisplay from "../ShopDisplay/ShopDisplay";
import Inventory from "../Inventory/Inventory";

import useFetchData from "../hooks/use-fetch-data";

import InvContext from "../Store/inv-context";

const Armourer = (props) => {
  const [armourItems, setArmourItems] = useState([]);

  const modifyArmourList = useCallback((armourArray) => {
    //make this a hook?
    const modifiedArmourArray = armourArray.map((armour) => {
      const splitCost = armour.cost.split(" ");
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

      const weightValue = armour[`encumbrance*`];
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
      return {
        id: armour._id,
        name: armour.armour,
        cost: armour.cost,
        weight: armour[`encumbrance*`],
        gpValue: numOfCoins * changeRate,
        trueWeight: trueWeight,
      };
    });
    setArmourItems(modifiedArmourArray);
  }, []);

  const { sendRequest: getArmour } = useFetchData("armour", modifyArmourList);

  useEffect(() => {
    getArmour();
  }, [getArmour]);

  const invCtx = useContext(InvContext);

  return (
    <div className={classes.background}>
      <h1>Armourer</h1>
      <h2>You have {Math.round(invCtx.gold * 100) / 100} GP</h2>
      <div className={classes["item-list-container"]}>
        <ShopDisplay
          shopName={"Armourer"}
          items={armourItems}
          exit={props.exit}
        />
        <Inventory />
        <footer>
          <button onClick={props.exit} className={classes["footer-button"]}>
            Exit
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Armourer;
