import React from 'react';

import classes from './TimeInDay.module.css';
import TimeDisplay from '../UI/TimeDisplay/TimeDisplay';

const displayDate = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 
        "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    let today = new Date();
    let dd = today.getDate();
    let day = days[today.getDay()];
    let month = months[today.getMonth()];
    let yyyy = today.getFullYear();
    dd = dd < 10 ? `0${dd}` : dd;
    return `${day}, ${month} ${dd}, ${yyyy}`
};

const timeInDay = props => {
    return (
        <div className={classes.TimeInDay}>
            <h2 className={classes.Header}>{displayDate()}</h2>
            <TimeDisplay label='Time Available' time={props.enteredTime}/>
            <TimeDisplay label='Remaining Time' time={props.remainingTime}/>
            <TimeDisplay label='Elapsed Time' time={props.elapsedTime}/>
        </div>
    );
};

export default timeInDay;