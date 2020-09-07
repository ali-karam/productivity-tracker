import React from 'react';

import classes from './RemoveActivity.module.css';

const removeActivity = (props) => {
    return (
        <div>
            <p className={classes.Message}>Are you sure you want to delete 
                <span> {props.activityName}</span>?
            </p>
            <button className={classes.Confirm} onClick={props.confirm}>Yes</button>
            <button className={classes.Cancel} onClick={props.cancel}>No</button>
        </div>
    );
};

export default removeActivity;