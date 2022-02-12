import { useState, useContext, useCallback } from "react";

import GeneralStore from "../GeneralStore/GeneralStore";
import Armourer from "../Armourer/Armourer";
import Weaponsmith from "../Weaponsmith/Weaponsmith";
import Bowyer from "../Bowyer/Bowyer";
import SubStatBlock from "../SubStatBlock/SubStatBlock";

import Button from "../UI/Button/Button";

import InvContext from "../Store/inv-context";
const Shops = () => {
  const [generalStoreOpen, setGeneralStoreOpen] = useState(false);
  const [armourerOpen, setArmourerOpen] = useState(false);
  const [weaponsmithOpen, setWeaponsmithOpen] = useState(false);
  const [bowyerOpen, setBowyerOpen] = useState(false);

  function openGeneralHandler() {
    setGeneralStoreOpen(true);
    setArmourerOpen(false);
    setWeaponsmithOpen(false);
    setBowyerOpen(false);
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

  function exitBowyer() {
    setBowyerOpen(false);
  }

  function openArmourerHandler() {
    setArmourerOpen(true);
    setGeneralStoreOpen(false);
    setWeaponsmithOpen(false);
    setBowyerOpen(false);
  }

  function openWeaponsmithHandler() {
    setWeaponsmithOpen(true);
    setArmourerOpen(false);
    setGeneralStoreOpen(false);
    setBowyerOpen(false);
  }

  function openBowyerHandler() {
    setBowyerOpen(true);
    setWeaponsmithOpen(false);
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
      {bowyerOpen && <Bowyer exit={exitBowyer} />}

      <Button label="General Store" clickHandler={openGeneralHandler} />
      <Button label="Armourer" clickHandler={openArmourerHandler} />
      <Button label="Weaponsmith" clickHandler={openWeaponsmithHandler} />
      <Button label="Bowyer" clickHandler={openBowyerHandler} />

      <SubStatBlock />
    </>
  );
};

export default Shops;
