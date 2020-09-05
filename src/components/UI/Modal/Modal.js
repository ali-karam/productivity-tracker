import React, {Component} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={`${classes.Modal} ${this.props.show ? classes.Show : classes.Hide}`}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;