import { useState, useCallback, useEffect, useContext } from "react";

import classes from "./Weaponsmith.module.css";

import ShopDisplay from "../ShopDisplay/ShopDisplay";
import Inventory from "../Inventory/Inventory";

import useFetchData from "../../hooks/use-fetch-data";

import InvContext from "../../Store/inv-context";

const Weaponsmith = (props) => {
  const [weaponItems, setWeaponItems] = useState([]);

  const modifyWeaponList = useCallback((weaponArray) => {
    //make this a hook?
    const modifiedWeaponArray = weaponArray.map((weapon) => {
      const splitCost = weapon.cost.split(" ");
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

      const weightValue = weapon.encumbrance;
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
        id: weapon._id,
        name: weapon[`Weapon Type`],
        cost: weapon.cost,
        weight: weapon.encumbrance,
        gpValue: numOfCoins * changeRate,
        trueWeight: trueWeight,
      };
    });
    const sortedArray = modifiedWeaponArray.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setWeaponItems(sortedArray);
  }, []);

  const { sendRequest: getWeapons } = useFetchData("weapons", modifyWeaponList);

  useEffect(() => {
    getWeapons();
  }, [getWeapons]);

  const invCtx = useContext(InvContext);

  return (
    <div className={classes.background}>
      <h1>Weaponsmith</h1>
      <h2>You have {Math.round(invCtx.gold * 100) / 100} GP</h2>
      <div className={classes["item-list-container"]}>
        <ShopDisplay items={weaponItems} exit={props.exit} />
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
export default Weaponsmith;
