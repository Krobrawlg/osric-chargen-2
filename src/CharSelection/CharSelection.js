import React, {useContext} from 'react';

// import { useRouter } from 'next/router';

import CharContext from "../Store/char-context";
import StatBox from "../StatBox/StatBox";

import classes from "./CharSelection.module.css";

const CharSelector = () => {
    const ctx = useContext(CharContext)


    // function goToSelectRace(){
    //     router.push('./RaceSelect');
    // }

    const statBlocks = ctx.stats.map((stat, index) =>(
        <StatBox key={stat.name}
        name={stat.name}
        value={stat.value}/>
    )
    )

    return(
        <>
            <h1>Stats</h1>
            <div className={classes['stat-block-list']}>
                {statBlocks}
            </div>
            <button >Select Race</button>
            <button>Select Class</button>
        </>
    )
}

export default CharSelector;