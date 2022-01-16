import { useEffect, useState } from "react";

import SelectionBox from "../SelectionBox/SelectionBox";

const RaceSelectScreen = () => {
  //get list of races
  const [races, setRaces] = useState([]);

  useEffect(() => {
    async function getRaceList() {
      const raceData = await fetch("http://localhost:3000/races");
      const raceList = await raceData.json();
      setRaces(raceList);
      console.log(raceList);
    }
    getRaceList();
  }, []);

  const raceListContent = races.map((race, index) => (
    <SelectionBox name={race.name} key={race.id} />
  ));

  return <div>{raceListContent}</div>;
};

export default RaceSelectScreen;
