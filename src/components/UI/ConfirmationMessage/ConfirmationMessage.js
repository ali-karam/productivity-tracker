import React from 'react';

import classes from './ConfirmationMessage.module.css';
import Button from '../Button/Button';

const removeActivity = (props) => {
    return (
        <div>
            <p className={classes.Message}>Are you sure you want to {props.message} 
                <span> {props.activityName}</span>?
            </p>
            <Button btnType='Confirm' clicked={props.confirm}>Yes</Button>
            <Button btnType='Cancel' clicked={props.cancel}>No</Button>
        </div>
    );
};

export default removeActivity;