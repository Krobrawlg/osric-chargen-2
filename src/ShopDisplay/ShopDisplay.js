// import { useContext } from "react";

import classes from "./ShopDisplay.module.css";

import ShopItem from "../ShopItem/ShopItem";

// import InvContext from "../Store/inv-context";

const ShopDisplay = (props) => {
  //   const invCtx = useContext(InvContext);

  let shopContents = props.items.map((item) => {
    return (
      <ShopItem
        item={item}
        key={item.id}
        numOfItem={item.number}
        hasButton={true}
        inInventory={false}
      ></ShopItem>
    );
  });

  return (
    <>
      {/* <h1>{props.shopName}</h1>
      <h2>You have {Math.round(invCtx.gold * 100) / 100} GP</h2>{" "} */}
      {/* <div className={classes["item-list-container"]}> */}
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
      {/* </div> */}
    </>
  );
};

export default ShopDisplay;
