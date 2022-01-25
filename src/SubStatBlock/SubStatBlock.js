import { useContext } from "react";
import CharContext from "../Store/char-context";

import classes from "./SubStatBlock.module.css";

const SubStatBlock = () => {
  const ctx = useContext(CharContext);
  const statBlock = ctx.stats.map((stat) => (
    <div className={classes["stat-box"]} key={stat.name}>
      <h2>{stat.name}</h2>
      <p>{stat.value}</p>
    </div>
  ));

  return <div className={classes["stat-block"]}>{statBlock}</div>;
};
export default SubStatBlock;
