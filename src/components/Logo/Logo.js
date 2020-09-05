import React from 'react';

import productivityLogo from '../../assets/images/clock.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={productivityLogo} alt='Productivity Logo'/>
    </div>
);

export default logo;