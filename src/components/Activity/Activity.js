import React from 'react';
import './Activity.css';

const activity = (props) => {
    return (
        <div className='Activity'>
            <h3 className='ActivityName'>{props.name}</h3>
            <p>{props.time}</p>
            <p>Goal</p>
            <p>Time Remaining</p>
            <button onClick={props.startTimer}>Start</button>
            <button onClick={props.stopTimer}>Pause</button>
            <button onClick={props.resetTimer}>Reset</button>
        </div>
    );
};

export default activity;