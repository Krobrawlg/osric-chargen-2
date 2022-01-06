import classes from "./StatBox.module.css"

const StatBox = (props) => {

    return(
    <div className={classes['stat-box']}>
        <h2>{props.name}</h2>
        <h3>{props.value}</h3>
    </div>)
}

export default StatBox;