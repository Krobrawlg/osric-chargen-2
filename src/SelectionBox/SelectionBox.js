import classes from "./SelectionBox.module.css";

const SelectionBox = (props) => {
  function capitalizeBoxLabel(label) {
    let splitLabel = label.split(/\s|-/);
    console.log(splitLabel);
    for (let word = 0; word < splitLabel.length; word++) {
      splitLabel[word] =
        splitLabel[word][0].toUpperCase() + splitLabel[word].slice(1);
    }
    const capitalizedLabel = splitLabel.join("-");
    return capitalizedLabel;
  }
  return (
    <div className={classes["selection-box"]}>
      <h2>{capitalizeBoxLabel(props.name)}</h2>
    </div>
  );
};

export default SelectionBox;
