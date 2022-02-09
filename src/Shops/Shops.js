import { useState, useContext, useCallback } from "react";

import GeneralStore from "../GeneralStore/GeneralStore";
import Armourer from "../Armourer/Armourer";
import Weaponsmith from "../Weaponsmith/Weaponsmith";
import SubStatBlock from "../SubStatBlock/SubStatBlock";

import Button from "../UI/Button/Button";

import InvContext from "../Store/inv-context";
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

  function exitArmourer() {
    setArmourerOpen(false);
  }

  function exitWeaponsmith() {
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

  const invCtx = useContext(InvContext);

  useCallback(() => {
    invCtx.generateGold();
  }, [invCtx]);

  return (
    //make button into a component (to simplify styling)
    <>
      {generalStoreOpen && <GeneralStore exit={exitGeneralStore} />}
      {armourerOpen && <Armourer exit={exitArmourer} />}
      {weaponsmithOpen && <Weaponsmith exit={exitWeaponsmith} />}
      <Button label="General Store" clickHandler={openGeneralHandler} />
      <Button label="Armourer" clickHandler={openArmourerHandler} />
      <Button label="Weaponsmith" clickHandler={openWeaponsmithHandler} />
      <SubStatBlock />
    </>
  );
};

export default Shops;
