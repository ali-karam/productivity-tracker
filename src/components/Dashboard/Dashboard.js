import React from 'react';

import classes from './Dashboard.module.css';
import {displayTime} from '../../shared/time';

const dashboard = props => {
    let totalGoal = 0;
    let sumRemaining = 0;
    let sumElapsed = 0;

    for(let activity of props.activities) {
        totalGoal += activity.goal;
        sumRemaining += activity.stopwatchTime;
        sumElapsed += activity.stopwatchTime;
    }
    if(isNaN(sumRemaining) || isNaN(sumElapsed)) {
        sumRemaining = 0;
        sumElapsed = 0;
    }

    return(
        <div className={classes.Dashboard}>
            <p><strong>Total Activities : </strong>{props.activities.length}</p>
            <p><strong>Total Goal : </strong>{displayTime(totalGoal)}</p>
            <p><strong>Time Achieved : </strong>{displayTime(sumElapsed)}</p>
            <p><strong>Time Left : </strong>{displayTime(totalGoal - sumRemaining)}</p>
        </div>
    );
};

export default dashboard;