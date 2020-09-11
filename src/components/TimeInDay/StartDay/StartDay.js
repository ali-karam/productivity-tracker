import React from 'react';

import classes from './StartDay.module.css';

const startDay = props => {

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        let duration = extractDuration(event.target.enteredTime.value);
        props.addDayTime(duration);
    };

    const addTimeToDate = (dateObject, time) => {
        let splitDate = dateObject.toString().split(':');
        let date = splitDate[0].slice(0, -2);
        return new Date(date+ time);
    };

    const extractDuration = (enteredTime) => {
        let today = new Date();
        let goalTime = addTimeToDate(today, enteredTime);
        
        if(goalTime - Date.now() <= 0) {
            today.setDate(new Date().getDate() + 1);
            goalTime = addTimeToDate(today, enteredTime);
        }
        return goalTime - Date.now();
    };

    return (
        <form className={classes.StartDay} onSubmit={formSubmissionHandler}>
            <label>
                Time you want to work until: 
                <input type='time' name='enteredTime' required/>
            </label>
            <button 
                className={classes.FormSubmit} 
                type='submit'>Submit
            </button>
        </form>
    );
};

export default startDay;