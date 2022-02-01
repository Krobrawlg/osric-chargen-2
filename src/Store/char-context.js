import React, { useState, useEffect } from "react";

const CharContext = React.createContext({
  generateStats: () => {},
  numberOfDice: 3,
  stats: [{}],
  charClass: null,
  race: null,
  setRace: () => {},
  job: null,
  setJob: () => {},
  selectionWindowOpen: false,
  capitalizeString: () => {},
  gold: 0,
  setGold: () => {},
  inventory: [],
  setInventory: () => {},
  statSwapper: () => {},
});

export const CharContextProvider = (props) => {
  const [stats, setStats] = useState([]);
  const [race, setRace] = useState(null);
  const [job, setJob] = useState(null);
  const [gold, setGold] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [numberOfDice, setNumberOfDice] = useState(3);
  const [removeLowestRoll, setRemoveLowestRoll] = useState(false);
  //   const [charClass, setCharClass] = useState(null);
  //   const [race, setRace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionWindowOpen, setSelectionWindowOpen] = useState(false);

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
    if (removeLowestRoll) {
      const numberOfDiceToRemove = 1;
      const lowestRoll = Math.min(...rollsArray);
      const lowestRollIndex = rollsArray.indexOf(lowestRoll);
      rollsArray.splice(lowestRollIndex, numberOfDiceToRemove);
    }
    const rollsSum = rollsArray.reduce(
      (total, currentRoll) => total + currentRoll
    );
    return rollsSum;
  };

  const generateStats = () => {
    const statInfo = [
      { name: "STR", value: 0 },
      { name: "DEX", value: 0 },
      { name: "CON", value: 0 },
      { name: "INT", value: 0 },
      { name: "WIS", value: 0 },
      { name: "CHA", value: 0 },
    ];
    for (const statObject of statInfo) {
      const maxNumD6 = 6;
      statObject.value = addRolls(numberOfDice, maxNumD6);
    }

    setStats(statInfo);
    setSelectionWindowOpen(true);
  };

  function capitalizeString(string) {
    let splitStrings = string.split(/\s|-/);
    console.log(splitStrings);

    return splitStrings
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join("-");
  }

  const [originStatSelected, setOriginStatSelected] = useState(false);
  const [originStatValue, setOriginStatValue] = useState();
  const [originStatName, setOriginStatName] = useState();
  // let originStat;
  // let targetStat;

  useEffect(() => {
    console.log(`This is the origin ${originStatValue}`);
  }, [originStatValue, stats]);

  const statSwapper = (inputStat) => {
    console.log(inputStat);
    console.log(inputStat.value);
    // const statToSwap = stats.filter((stat) => stat.name === statName)

    // let statToSwap = statArrayCopy.filter(
    //   (stat) => stat.name === statCopy.name
    // );
    if (!originStatSelected) {
      setOriginStatValue(inputStat.value);
      setOriginStatName(inputStat.name);
      setOriginStatSelected(true);
      return;
    } else {
      setStats(
        [...stats].map((stat) => {
          if (stat.name === inputStat.name) {
            return {
              ...stat,
              value: originStatValue,
            };
          } else if (stat.name === originStatName) {
            return {
              ...stat,
              value: inputStat.value,
            };
          } else {
            return stat;
          }
        })
      );

      setOriginStatSelected(false);
    }
  };

  return (
    <CharContext.Provider
      value={{
        stats,
        // charClass: charClass,
        // race: race,
        generateStats,
        setNumberOfDice,
        isLoading,
        setIsLoading,
        selectionWindowOpen,
        setSelectionWindowOpen,
        setRemoveLowestRoll,
        race,
        setRace,
        job,
        setJob,
        capitalizeString,
        gold,
        setGold,
        inventory,
        setInventory,
        statSwapper,
      }}
    >
      {props.children}
    </CharContext.Provider>
  );
};

export default CharContext;
