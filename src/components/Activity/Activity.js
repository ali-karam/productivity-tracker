import React from 'react';

import classes from './Activity.module.css';

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
            <p>
                <strong>Goal : </strong>
                {props.goalTime}
            </p>
            <p>
                <strong>Remaining : </strong>
                {props.remainingTime}
            </p>
            <p>
                <strong>Elapsed : </strong>
                {props.elapsedTime}
            </p>
            {timerButton}
            <button className={classes.DeleteButton} 
                    onClick={props.deleteActivity}>Delete
                </button>
        </div>
    );
};

export default activity;