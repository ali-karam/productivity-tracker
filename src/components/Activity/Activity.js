import React from 'react';

import classes from './Activity.module.css';
import TimeDisplay from '../UI/TimeDisplay/TimeDisplay';
import Button from '../UI/Button/Button';

const activity = props => {
    let timerButton = <Button clicked={props.startTimer}>Start</Button>;

    if(props.timerOn) {
        timerButton = <Button clicked={props.stopTimer}>Pause</Button>;
    }

    return (
        <div className={classes.Activity}>
            <h3 className={classes.ActivityName}>{props.name}</h3>
            <TimeDisplay display2 label='Goal' time={props.goalTime}/>
            <TimeDisplay display2 label='Remaining' time={props.remainingTime}/>
            <TimeDisplay display2 label='Elapsed' time={props.elapsedTime}/>
            {timerButton}
            <Button btnType='DeleteButton' clicked={props.deleteActivity}>
                Delete
            </Button>
        </div>
    );
};

export default activity;