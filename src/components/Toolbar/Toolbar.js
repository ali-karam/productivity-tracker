import React from 'react';
import './Toolbar.css';
import Logo from '../Logo/Logo';


const toolbar = (props) => (
    <header className='Toolbar'>
        <div className={'Logo'}>
            <Logo/>
        </div>
        <h1 className='Title'>Productivity Tracker</h1>
    </header>
);

export default toolbar;