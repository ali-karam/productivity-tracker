import React, {Component} from 'react';

import Activity from '../Activity/Activity';
import Modal from '../../components/UI/Modal/Modal';
import AddActivity from '../../components/ActivityModals/AddActivity/AddActivity';
import RemoveActivity from '../../components/ActivityModals/RemoveActivity/RemoveActivity';
import classes from './ProductivityTracker.module.css';

class ProductivityTracker extends Component {
    state = {
        addingActivity: false,
        deletingActivity: false,
        deleteActivityIndex: null,
        activities: []
    };

    fetchActivitiesFromLocalStorage() {
        if (localStorage.hasOwnProperty('activities')) {
            let value = localStorage.getItem('activities');
        try {
            value = JSON.parse(value);
            this.setState({ 'activities': value });
        } catch (error) {
            this.setState({ 'activities': value });
        }
        }
    }

    saveActivitiesToLocalStorage() {
        localStorage.setItem('activities', JSON.stringify(this.state.activities));
    }

    componentDidMount() {
        this.fetchActivitiesFromLocalStorage();
        window.addEventListener("beforeunload",
          this.saveActivitiesToLocalStorage.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload",
          this.saveActivitiesToLocalStorage.bind(this));
        this.saveActivitiesToLocalStorage();
    }

    addActivityHandler = (activityData) => {
        this.setState({
            addingActivity: false,
            activities: [
                ...this.state.activities,
                {
                    activityName: activityData.activityName,
                    goal: +activityData.goal
                }
            ]
        });
    };

    showAddActivityForm = () => {
        this.setState({addingActivity: true});
    };

    hideAddActivityForm = () => {
        this.setState({addingActivity: false});
    };

    deleteActivityHandler = (id) => {
        this.setState({deletingActivity: true, deleteActivityIndex: id});
    };

    deleteConfirmHandler = () => {
        if(this.state.deletingActivity && this.state.deleteActivityIndex !== null) {
            const updatedActivities = [...this.state.activities];
            updatedActivities.splice(this.state.deleteActivityIndex, 1);
            this.setState({
                activities: updatedActivities, 
                deletingActivity: false, 
                deleteActivityIndex: null
            });
        }
    };

    deleteCancelHandler = () => {
        this.setState({deletingActivity: false, deleteActivityIndex: null});
    };

    render() {
        let activitiesList = this.state.activities.map((activity, index) => (
            <Activity 
                key={index} 
                name={activity.activityName} 
                duration={activity.goal}
                deleteActivity={() => this.deleteActivityHandler(index)}/>
        ));
        
        let deleteActivityName = null;
        if(this.state.deletingActivity) {
            deleteActivityName = this.state.activities[this.state.deleteActivityIndex].activityName;
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
                        activityName={deleteActivityName}/>
                </Modal> 
                {activitiesList}
            </div>
        );
    }
}

export default ProductivityTracker;