import { useState } from "react";

import GeneralStore from "../GeneralStore/GeneralStore";
import Armourer from "../Armourer/Armourer";
import Weaponsmith from "../Weaponsmith/Weaponsmith";
import SubStatBlock from "../SubStatBlock/SubStatBlock";

import Button from "../UI/Button/Button";
const Shops = () => {
  const [generalStoreOpen, setGeneralStoreOpen] = useState(false);
  const [armourerOpen, setArmourerOpen] = useState(false);
  const [weaponsmithOpen, setWeaponsmithOpen] = useState(false);

  function openGeneralHandler() {
    setGeneralStoreOpen(true);
    setArmourerOpen(false);
    setWeaponsmithOpen(false);
  }

  function exitGeneralStore() {
    setGeneralStoreOpen(false);
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
      {generalStoreOpen && <GeneralStore exit={exitGeneralStore} />}
      {armourerOpen && <Armourer />}
      {weaponsmithOpen && <Weaponsmith />}
      <Button label="General Store" clickHandler={openGeneralHandler} />
      <Button label="Armourer" clickHandler={openArmourerHandler} />
      <Button label="Weaponsmith" clickHandler={openWeaponsmithHandler} />
      <SubStatBlock />
    </>
  );
};

export default Shops;
