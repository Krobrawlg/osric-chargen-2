import React, { useState } from "react";

import ShopItem from "../ShopItem/ShopItem";

const InvContext = React.createContext({
  inventory: [],
  setInventory: () => {},
  inventoryContents: [],
  setInventoryContents: () => {},
  gold: 0,
  setGold: () => {},
  addItemToCart: () => {},
});

export const InvContextProvider = (props) => {
  const [inventory, setInventory] = useState([]);
  const [gold, setGold] = useState(0);
  const [inventoryContents, setInventoryContents] = useState([]);

  function addItemToCart(item) {
    setInventory(() => [...inventory, item]);
    const newInventoryItem = (
      //how to refactor this? rename items once they are pulled from the api
      <ShopItem
        key={item._id}
        name={item.name}
        cost={item.cost}
        weight={item.weight}
        hasButton={false}
      />
    );
    setInventoryContents(() => [...inventoryContents, newInventoryItem]);
  }

  return (
    <InvContext.Provider
      value={{
        inventory,
        setInventory,
        gold,
        setGold,
        addItemToCart,
        inventoryContents,
      }}
    >
      {props.children}
    </InvContext.Provider>
  );
};

export default InvContext;
