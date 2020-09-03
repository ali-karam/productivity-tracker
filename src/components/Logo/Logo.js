import React from 'react';
import productivityLogo from '../../assets/images/clock.png';
import './Logo.css';

const logo = () => (
    <div className='Logo'>
        <img src={productivityLogo} alt='Productivity Logo'/>
    </div>
);

export default logo;