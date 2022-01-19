import React, { useState } from "react";

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
});

export const CharContextProvider = (props) => {
  const [stats, setStats] = useState([]);
  const [race, setRace] = useState(null);
  const [job, setJob] = useState(null);
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
      console.log(lowestRoll);
    }
    console.log(rollsArray);
    const rollsSum = rollsArray.reduce(
      (total, currentRoll) => total + currentRoll
    );
    return rollsSum;
  };

  const generateStats = () => {
    const stats = [
      { name: "STR", value: 0 },
      { name: "DEX", value: 0 },
      { name: "CON", value: 0 },
      { name: "INT", value: 0 },
      { name: "WIS", value: 0 },
      { name: "CHA", value: 0 },
    ];
    for (const statObject of stats) {
      const maxNumD6 = 6;
      statObject.value = addRolls(numberOfDice, maxNumD6);
    }

    setStats(stats);
    console.log(stats);
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

  return (
    <CharContext.Provider
      value={{
        stats: stats,
        // charClass: charClass,
        // race: race,
        generateStats: generateStats,
        setNumberOfDice: setNumberOfDice,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        selectionWindowOpen: selectionWindowOpen,
        setSelectionWindowOpen: setSelectionWindowOpen,
        setRemoveLowestRoll: setRemoveLowestRoll,
        race: race,
        setRace: setRace,
        job: job,
        setJob: setJob,
        capitalizeString: capitalizeString,
      }}
    >
      {props.children}
    </CharContext.Provider>
  );
};

export default CharContext;

// const hardcoreMode = 3;
// const diceRoll = 4;

// const statLists = [
//   [1, 2, 3, 4],
//   [1, 2, 3, 4],
//   [1, 2, 3, 4],
//   [1, 2, 3, 4],
//   [1, 2, 3, 4],
//   [1, 2, 3, 4]
// ]
// let a;
// if (hardcoreMode === diceRoll){
// a = statLists;
// }
// else {
//   a = statLists.map((statList) => {

//   const statListCopy = [...statList];

//     const lowest = Math.min(...statListCopy);
//     const lowestIndex = statListCopy.indexOf(lowest);
//     //probably a more efficient way for this
//     statListCopy.splice(lowestIndex, 1);
//     return statListCopy;

//   })
// }

// const calcSum = (accumulator, curr) => accumulator + curr;

// const statArray = a.map((x) => x.reduce(calcSum, 0));

// console.log(a);
// console.log(statArray);
