import React, {Component} from 'react';

import Activity from '../Activity/Activity';
import Modal from '../../components/UI/Modal/Modal';
import AddActivity from '../../components/AddActivity/AddActivity';
import classes from './ProductivityTracker.module.css';

class ProductivityTracker extends Component {
    state = {
        addingActivity: false
    };

    addActivityHandler = () => {
        this.setState({addingActivity: true});
    };

    cancelAddActivityHandler = () => {
        this.setState({addingActivity: false});
    };

    render() {
        return (
            <div>
                <button 
                    className={classes.AddActivity} 
                    onClick={this.addActivityHandler}>Add Activity
                </button>
                <Modal show={this.state.addingActivity} modalClosed={this.cancelAddActivityHandler}>
                    <AddActivity/>
                </Modal>
                <Activity duration={1000 * 60 * 60 * 5} name="Study"/>
            </div>
        );
    }
}

export default ProductivityTracker;