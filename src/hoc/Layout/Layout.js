import React from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Layout.css';

const layout = (props) => {
    return (
        <React.Fragment>
            <Toolbar/>
            <main className='Content'>
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default layout;