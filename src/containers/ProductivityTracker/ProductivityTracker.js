import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/actions';
import Activity from '../Activity/Activity';
import Modal from '../../components/UI/Modal/Modal';
import AddActivity from '../../components/ActivityModals/AddActivity/AddActivity';
import RemoveActivity from '../../components/ActivityModals/RemoveActivity/RemoveActivity';
import classes from './ProductivityTracker.module.css';

class ProductivityTracker extends Component {
    state = {
        addingActivity: false,
        deletingActivity: false,
        idToDelete: null
    };

    saveActivitiesToLocalStorage() {
        if(this.props.activities.length > 0) {
            localStorage.setItem('activities', JSON.stringify(this.props.activities));
        }
    }

    componentDidMount() {
        if(localStorage.hasOwnProperty('activities')) {
            this.props.onInitializeActivity();
        }
        window.addEventListener("beforeunload",
          this.saveActivitiesToLocalStorage.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload",
          this.saveActivitiesToLocalStorage.bind(this));
        this.saveActivitiesToLocalStorage();
    }

    addActivityHandler = (activityData) => {
        this.setState({addingActivity: false});
        this.props.onAddActivity(activityData.activityName, activityData.goal);
    };

    showAddActivityForm = () => {
        this.setState({addingActivity: true});
    };

    hideAddActivityForm = () => {
        this.setState({addingActivity: false});
    };

    deleteActivityHandler = (id) => {
        this.setState({deletingActivity: true, idToDelete: id});
    };

    deleteConfirmHandler = () => {
        if(this.state.deletingActivity && this.state.idToDelete !== null) {
            this.props.onDeleteActivity(this.state.idToDelete);
            this.setState({deletingActivity: false, idToDelete: null});
        }
    };

    deleteCancelHandler = () => {
        this.setState({deletingActivity: false, idToDelete: null});
    };

    render() {
        let activitiesList = this.props.activities.map(activity => (
            <Activity 
                key={activity.id} 
                id={activity.id}
                idToDelete={this.state.idToDelete}
                name={activity.activityName} 
                duration={activity.goal}
                stopwatchStart={activity.stopwatchStart}
                stopwatchTime={activity.stopwatchTime}
                timerStart={activity.timerStart}
                timerTime={activity.timerTime}
                deleteActivity={() => this.deleteActivityHandler(activity.id)}
            />
        ));
        
        let deleteActivityName = null;
        if(this.state.deletingActivity) {
            deleteActivityName = this.props.activities.find(activity => 
                activity.id === this.state.idToDelete).activityName;
        }
        return (
            <div>
                <button 
                    className={classes.AddActivity} 
                    onClick={this.showAddActivityForm}>Add Activity
                </button>
                <Modal show={this.state.addingActivity} modalClosed={this.hideAddActivityForm}>
                    <AddActivity addActivity={this.addActivityHandler}/>
                </Modal>
                <Modal show={this.state.deletingActivity} modalClosed={this.deleteCancelHandler}>
                    <RemoveActivity 
                        cancel={this.deleteCancelHandler} 
                        confirm={this.deleteConfirmHandler}
                        activityName={deleteActivityName}
                    />
                </Modal> 
                {activitiesList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activities
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddActivity: (activityName, goal) => dispatch(actions.addActivity(activityName, goal)),
        onDeleteActivity: (index) => dispatch(actions.deleteActivity(index)),
        onInitializeActivity: () => dispatch(actions.initializeActivities())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductivityTracker);