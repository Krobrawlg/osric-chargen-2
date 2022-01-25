import { useState } from "react";

import classes from "./Shops.module.css";

import GeneralStore from "../GeneralStore/GeneralStore";
import Armourer from "../Armourer/Armourer";
import Weaponsmith from "../Weaponsmith/Weaponsmith";
import SubStatBlock from "../SubStatBlock/SubStatBlock";

const Shops = () => {
  const [generalStoreOpen, setGeneralStoreOpen] = useState(false);
  const [armourerOpen, setArmourerOpen] = useState(false);
  const [weaponsmithOpen, setWeaponsmithOpen] = useState(false);

  function openGeneralHandler() {
    setGeneralStoreOpen(true);
    setArmourerOpen(false);
    setWeaponsmithOpen(false);
  }

  function openArmourerHandler() {
    setArmourerOpen(true);
    setGeneralStoreOpen(false);
    setWeaponsmithOpen(false);
  }

  function openWeaponsmithHandler() {
    setWeaponsmithOpen(true);
    setArmourerOpen(false);
    setGeneralStoreOpen(false);
  }
  return (
    //make button into a component (to simplify styling)
    <>
      {generalStoreOpen && <GeneralStore />}
      {armourerOpen && <Armourer />}
      {weaponsmithOpen && <Weaponsmith />}
      <button onClick={openGeneralHandler}>General Store</button>
      <button onClick={openArmourerHandler}>Armourer</button>
      <button onClick={openWeaponsmithHandler}>Weaponsmith</button>
      <SubStatBlock />
    </>
  );
};

export default Shops;
