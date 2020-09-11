import React from 'react';

import classes from './Button.module.css';

const button = props => (
    <button 
        onClick={props.clicked} 
        disabled={props.disabled}
        type={props.isSubmit ? 'submit' : 'button'}
        className={`${classes.Button} ${classes[props.btnType]}`}>
            {props.children}
    </button>
);

export default button;