import React from 'react';

import classes from './TimeInDay.module.css';
import TimeDisplay from '../UI/TimeDisplay/TimeDisplay';

const timeInDay = props => {
    return (
        <div className={classes.TimeInDay}>
            <h2 className={classes.Header}>{props.name}</h2>
            <TimeDisplay label='Entered Time' time={props.enteredTime}/>
            <TimeDisplay label='Remaining Time' time={props.remainingTime}/>
            <TimeDisplay label='Elapsed Time' time={props.elapsedTime}/>
        </div>
    );
};

export default timeInDay;