import React from 'react';

import Logo from '../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <h1 className={classes.PageTitle}>Productivity Tracker</h1>
        <button className={classes.AddActivity} onClick={props.addActivity}>Add Activity</button>
    </header>
);

export default toolbar;