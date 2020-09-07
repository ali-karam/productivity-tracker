import React from 'react';

import classes from './Timer.module.css';

const timer = props => {
    let timerButton = <button className={classes.TimerButton} 
    onClick={props.startTimer}>Start</button>;

    if(props.timerOn) {
        timerButton = <button className={classes.TimerButton} 
            onClick={props.stopTimer}>Pause</button>;
    }
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default timer;