import { useContext } from "react";

import ShopItem from "../ShopItem/ShopItem.js";

import InvContext from "../../Store/inv-context";

import classes from "./Inventory.module.css";

const Inventory = (props) => {
  const invCtx = useContext(InvContext);

  function removeItemHandler(id) {
    invCtx.removeItem(id);
  }

  function addItemHandler(item) {
    invCtx.addItem({ ...item, number: 1 });
  }
  let inventoryContents = invCtx.inventory.map((item) => {
    return (
      <ShopItem
        item={item}
        key={item.id}
        numOfItems={item.number}
        hasButton={false}
        inInventory={true}
        removeItem={removeItemHandler.bind(null, item.id)}
        addItem={addItemHandler.bind(null, item)}
      />
    );
  });

  let totalWeight = invCtx.totalWeight;
  return (
    <div className={classes["item-list"]}>
      <table className={classes["item-table"]}>
        <thead className={classes["table-header"]}>
          <tr>
            <th></th>
            <th></th>
            <th>
              <h3 className={classes.h3}>Inventory</h3>
            </th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Item</th>
            <th>Cost</th>
            <th>Weight</th>
            <th />
            <th>Number</th>
            <th />
          </tr>
        </thead>
        <tbody>{inventoryContents}</tbody>
      </table>
      <h3 className={classes["weight-display"]}>Total Weight: {totalWeight}</h3>
    </div>
  );
};

export default Inventory;
