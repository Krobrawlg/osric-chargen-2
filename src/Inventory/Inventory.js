import { useContext } from "react";

// import ShopItem from "../ShopItem/ShopItem.js";

import InvContext from "../Store/inv-context";

import classes from "./Inventory.module.css";

const Inventory = (props) => {
  const invCtx = useContext(InvContext);
  return (
    <div className={classes["item-list"]}>
      <table className={classes["item-table"]}>
        <thead>
          <h3>Your Inventory</h3>
          <tr className={classes.header}>
            <th className={classes.header}>Item</th>
            <th className={classes.header}>Cost</th>
            <th className={classes.header}>Weight</th>
            <th className={classes.header}>Number</th>
            <th className={classes.header}></th>
          </tr>
        </thead>
        <tbody>{invCtx.inventoryContents}</tbody>
      </table>
    </div>
  );
};

export default Inventory;

//Assignments to the 'inventoryContents' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect.
