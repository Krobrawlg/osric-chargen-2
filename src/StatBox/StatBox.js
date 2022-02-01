import classes from "./StatBox.module.css";

const StatBox = (props) => {
  function clickHandler() {
    console.log(`Prop stat ${props.stat}`);
    props.functionOnClick(props.stat);
  }
  return (
    <div className={classes["stat-box"]} tabIndex={0} onClick={clickHandler}>
      <h2>{props.stat.name}</h2>
      <h3>{props.stat.value}</h3>
    </div>
  );
};

export default StatBox;
