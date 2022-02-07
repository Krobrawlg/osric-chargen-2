import React, { useReducer } from "react";

const InvContext = React.createContext({
  inventoryContents: [],
  setInventoryContents: () => {},
  gold: 0,
  generateGold: (job) => {},
  totalWeight: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const rollDie = (maxNumOnDie) => {
  const minNumOnDie = 1;
  const dieRoll = Math.floor(Math.random() * maxNumOnDie + minNumOnDie);
  return dieRoll;
};

const addRolls = (numberOfDice, maxNumOnDie) => {
  let rollsArray = [];
  for (let rollCount = 0; rollCount < numberOfDice; rollCount++) {
    rollsArray.push(rollDie(maxNumOnDie));
  }
  const rollsSum = rollsArray.reduce(
    (total, currentRoll) => total + currentRoll
  );
  return rollsSum;
};

let job;
let startingGold;
if (job === "cleric" || "druid") {
  //3d6x 10
  startingGold = addRolls(3, 6) * 10;
} else if (job === "fighter" || "ranger" || "paladin") {
  startingGold = (addRolls(3, 6) + 2) * 10;
} else if (job === "magin-user" || "illusionist") {
  startingGold = addRolls(2, 4) * 10;
} else {
  startingGold = addRolls(2, 6) * 10;
}

const defaultInventoryState = {
  inventory: [],
  remainingGold: startingGold,
  totalWeight: 0,
};
const inventoryReducer = (state, action) => {
  let updatedInventory;
  let updatedItem;

  if (action.type === "ADD") {
    console.log(`Action items gpvalue ${action.item.gpValue}`);
    const transactionPrice = action.item.gpValue * action.item.number;
    const goldAfterTransaction = state.remainingGold - transactionPrice;
    let updatedWeight;
    const itemHasWeight = !isNaN(action.item.weight);
    if (itemHasWeight) {
      updatedWeight =
        state.totalWeight + action.item.weight * action.item.number;
    } else {
      updatedWeight = state.totalWeight;
    }
    if (!(goldAfterTransaction >= 0)) {
      console.log("need more gold");
      return {
        inventory: state.inventory,
        remainingGold: state.remainingGold,
        totalWeight: state.totalWeight,
      };
    } else {
      const existingItemIndex = state.inventory.findIndex((item) => {
        return item.id === action.item.id;
      });
      const existingItem = state.inventory[existingItemIndex];
      if (existingItem) {
        updatedItem = {
          ...existingItem,
          number: existingItem.number + action.item.number,
        };
        updatedInventory = [...state.inventory];
        updatedInventory[existingItemIndex] = updatedItem;
      } else {
        updatedInventory = state.inventory.concat(action.item);
      }
      return {
        inventory: updatedInventory,
        remainingGold: goldAfterTransaction,
        totalWeight: updatedWeight,
      };
    }
  }
  if (action.type === "REMOVE") {
    console.log(`Action item ${action.item.id}`);

    const existingItemIndex = state.inventory.findIndex((item) => {
      console.log(`inventory item ${item}}`);
      return item.id === action.item.id;
    });
    console.log(`existing index ${existingItemIndex}`);
    const existingItem = state.inventory[existingItemIndex];
    console.log(`existingItem ${existingItem}`);
    const goldAfterTransaction = state.remainingGold + action.item.gpValue;
    const updatedWeight = state.totalWeight - action.item.weight;
    if (existingItem.number === 1) {
      updatedInventory = state.inventory.filter((item) => {
        return item.id !== action.item.id;
      });
    } else {
      updatedItem = {
        ...existingItem,
        number: existingItem.number - 1,
      };
      updatedInventory = [...state.inventory];
      updatedInventory[existingItemIndex] = updatedItem;
    }
    return {
      inventory: updatedInventory,
      remainingGold: goldAfterTransaction,
      totalWeight: updatedWeight,
    };
  }

  return defaultInventoryState;
};

export const InvContextProvider = (props) => {
  const [inventoryState, dispatchInventoryAction] = useReducer(
    inventoryReducer,
    defaultInventoryState
  );

  function addItemHandler(item) {
    dispatchInventoryAction({ type: "ADD", item: item });
  }

  function removeItemHandler(item) {
    dispatchInventoryAction({ type: "REMOVE", item: item });
  }

  const inventoryContext = {
    inventory: inventoryState.inventory,
    gold: inventoryState.remainingGold,
    totalWeight: inventoryState.totalWeight,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <InvContext.Provider value={inventoryContext}>
      {props.children}
    </InvContext.Provider>
  );
};

export default InvContext;
