import React, {Component} from 'react';

import classes from './AddActivity.module.css';

class AddActivity extends Component {
    state = {
        activityName: {
            valid: false,
            value: '',
            touched: false
        },
        duration: {
            valid: false,
            value: '',
            touched: false
        }
    };

    formSubmissionHandler = (event) => {
        event.preventDefault();

        const formData = {
            activityName: event.target.activityName.value,
            goal: this.extractDuration(event.target.goal.value)
        };
        this.props.addActivity(formData);
        this.resetForm();
    };

    extractDuration = (userDuration) => {
        let seconds = 0;
        let hours = userDuration.match(/^[0-1]?[0-9]/);
        let minutes = userDuration.match(/(?<=:)[0-5][0-9]$/);
        if(hours) {
            seconds += parseInt(hours[0]) * 3600;
        }
        if(minutes) {
            seconds += parseInt(minutes[0]) * 60;
        }
        return seconds * 1000;
    };

    inputChangedHandler = (event, inputIdentifier) => {
        if(inputIdentifier === 'activityName') {
            this.setState({
                activityName: {
                    ...this.state.activityName,
                    value: event.target.value,
                    valid: this.isValidName(event.target.value)
                }
            });
        }
        if(inputIdentifier === 'goal') {
            this.setState({
                duration: {
                    ...this.state.duration,
                    value: event.target.value,
                    valid: this.isValidDuration(event.target.value)
                }
            });
        }
    };

    isValidName = (name) => {
        return name.trim() !== '';
    };

    isValidDuration = (value) => {
        const pattern = /^[0-1]?[0-9](:[0-5][0-9])?$/;
        return pattern.test(value);
    };

    blurHandler = (inputIdentifier) => {
        if(inputIdentifier === 'activityName') {
            this.setState({
                activityName: {
                    ...this.state.activityName,
                    touched: true
                }
            });
        }
        if(inputIdentifier === 'duration') {
            this.setState({
                duration: {
                    ...this.state.duration,
                    touched: true
                }
            });
        }
    };

    resetForm = () => {
        this.setState({
            activityName: {
                valid: false,
                value: '',
                touched: false
            },
            duration: {
                valid: false,
                value: '',
                touched: false
            }
        })
    };

    render() {
        let nameError = null;
        let durationError = null;

        if(!this.state.activityName.valid && this.state.activityName.touched) {
            nameError = <p className={classes.Error}>
                Please enter an activity name</p>
        }  
        if(!this.state.duration.valid && this.state.duration.touched) {
            durationError = <p className={classes.Error}>
                Please enter a value in the form of hh:mm or hh</p>
        }

        return (
            <React.Fragment>
                <h2 className={classes.FormTitle}>Add Activity</h2>
                <form onSubmit={this.formSubmissionHandler}>
                    <div className={classes.FormControl}>
                        <label>
                            Activity Name:
                            <input 
                                type="text" 
                                name="activityName" 
                                value={this.state.activityName.value}
                                placeholder="Study, Exercise"
                                onChange={
                                    (event) => this.inputChangedHandler(event, 'activityName')
                                }
                                onBlur={() => this.blurHandler('activityName')}
                            />
                        </label>
                        {nameError}
                    </div>
                    <div className={classes.FormControl}>
                        <label>
                            Goal:
                            <input 
                                type="text" 
                                name="goal" 
                                value={this.state.duration.value}
                                placeholder="0:00"
                                onChange={
                                    (event) => this.inputChangedHandler(event, 'goal')
                                }
                                onBlur={() => this.blurHandler('duration')}
                            />
                        </label>
                        {durationError}
                    </div>
                    <button 
                        className={classes.FormSubmit} 
                        disabled={!this.state.activityName.valid || 
                            !this.state.duration.valid}
                        type="submit">Add Activity
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

export default AddActivity;