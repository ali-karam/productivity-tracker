import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/actions';
import Timer from '../Timer/Timer';
import Modal from '../../components/UI/Modal/Modal';
import AddActivity from '../../components/ActivityModals/AddActivity/AddActivity';
import ConfirmationMessage from '../../components/UI/ConfirmationMessage/ConfirmationMessage';
import StartDay from '../../components/TimeInDay/StartDay/StartDay';
import Button from '../../components/UI/Button/Button';

class ProductivityTracker extends Component {
    state = {
        addingActivity: false,
        deletingActivity: false,
        idToDelete: null,
        resettingDayTimer: false
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
        if(localStorage.hasOwnProperty('dayTimer')) {
            let timerDuration = localStorage.getItem('dayTimer');
            timerDuration = JSON.parse(timerDuration);
            this.props.onSetDayTimer(timerDuration.duration);
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

    resetDayTimerHandler = () => {
        this.setState({resettingDayTimer: true});
    };

    resetConfirmHandler = () => {
        this.props.onSetDayTimer(null);
        localStorage.removeItem('dayTimer');
        this.setState({resettingDayTimer: false});
    }

    resetCancelHandler = () => {
        this.setState({resettingDayTimer: false});
    };

    render() {
        let activitiesList = this.props.activities.map(activity => (
            <Timer
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

        let dayTimer = null;
        if(this.props.dayTimerDuration !== null) {
            dayTimer = (
                <Timer 
                isDayTimer={true} 
                duration={this.props.dayTimerDuration}/>
            );
        }

        return (
            <div>
                {dayTimer}
                <Button btnType='AddActivity'clicked={this.showAddActivityForm}>
                    Add Activity
                </Button>
                <Button btnType='ResetDayTimer' clicked={this.resetDayTimerHandler}>
                    Reset Day Timer
                </Button>
                <Modal show={this.state.resettingDayTimer} modalClosed={this.resetCancelHandler}>
                    <ConfirmationMessage 
                        cancel={this.resetCancelHandler} 
                        confirm={this.resetConfirmHandler}
                        message='reset the day timer'
                    />
                </Modal> 
                <Modal show={this.props.dayTimerDuration === null}>
                    <StartDay addDayTime={this.props.onSetDayTimer}/>
                </Modal>
                <Modal show={this.state.addingActivity} modalClosed={this.hideAddActivityForm}>
                    <AddActivity addActivity={this.addActivityHandler}/>
                </Modal>
                <Modal show={this.state.deletingActivity} modalClosed={this.deleteCancelHandler}>
                    <ConfirmationMessage 
                        cancel={this.deleteCancelHandler} 
                        confirm={this.deleteConfirmHandler}
                        activityName={deleteActivityName}
                        message='delete'
                    />
                </Modal> 
                {activitiesList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activities,
        dayTimerDuration: state.dayTimerDuration
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddActivity: (activityName, goal) => 
            dispatch(actions.addActivity(activityName, goal)),
        onDeleteActivity: (index) => dispatch(actions.deleteActivity(index)),
        onInitializeActivity: () => dispatch(actions.initializeActivities()),
        onSetDayTimer: (timerDuration) => 
            dispatch(actions.setDayTimerDuration(timerDuration))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductivityTracker);