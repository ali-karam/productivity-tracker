
import React from 'react';

import classes from '../TimeDisplay/TimeDisplay.module.css';

const timeDisplay = props => {
    const style = props.display2 ? classes.Display2 : classes.Display;
    return (
        <div className={style}>
            <strong>{props.label} : </strong> {props.time}
        </div>
    );
};

export default timeDisplay;