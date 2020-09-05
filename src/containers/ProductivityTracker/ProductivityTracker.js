import React, {Component} from 'react';

import Activity from '../Activity/Activity';
import Modal from '../../components/UI/Modal/Modal';
import AddActivity from '../../components/AddActivity/AddActivity';
import classes from './ProductivityTracker.module.css';

class ProductivityTracker extends Component {
    state = {
        addingActivity: false
    };

    showAddActivityForm = () => {
        this.setState({addingActivity: true});
    };

    hideAddActivityForm = () => {
        this.setState({addingActivity: false});
    };

    render() {
        return (
            <div>
                <button 
                    className={classes.AddActivity} 
                    onClick={this.showAddActivityForm}>Add Activity
                </button>
                <Modal show={this.state.addingActivity} modalClosed={this.hideAddActivityForm}>
                    <AddActivity/>
                </Modal>
                <Activity duration={1000 * 60 * 60 * 5} name="Study"/>
            </div>
        );
    }
}

export default ProductivityTracker;