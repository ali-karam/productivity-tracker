import React from 'react';

import classes from './Activity.module.css';
import TimeDisplay from '../UI/TimeDisplay/TimeDisplay';

const activity = props => {
    let timerButton = <button className={classes.TimerButton} 
    onClick={props.startTimer}>Start</button>;

    if(props.timerOn) {
        timerButton = <button className={classes.TimerButton} 
            onClick={props.stopTimer}>Pause</button>;
    }

    return (
        <div className={classes.Activity}>
            <h3 className={classes.ActivityName}>{props.name}</h3>
            <TimeDisplay display2 label='Goal' time={props.goalTime}/>
            <TimeDisplay display2 label='Remaining' time={props.remainingTime}/>
            <TimeDisplay display2 label='Elapsed' time={props.elapsedTime}/>
            {timerButton}
            <button className={classes.DeleteButton} 
                    onClick={props.deleteActivity}>Delete
            </button>
        </div>
    );
};

export default activity;