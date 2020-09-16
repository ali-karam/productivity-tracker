import React, {Component} from 'react';

import classes from './StartDay.module.css';
import Button from '../../UI/Button/Button';

class StartDay extends Component {
    state = {
        error: false
    }

    formSubmissionHandler = (event) => {
        event.preventDefault();
        if(this.isValidTime(event.target.enteredTime.value)) {
            let duration = this.extractDuration(event.target.enteredTime.value);
            this.props.addDayTime(duration);
            this.setState({error: false});
        } else {
            this.setState({error: true});
        }
    };

    addTimeToDate = (dateObject, time) => {
        let splitDate = dateObject.toString().split(':');
        let date = splitDate[0].slice(0, -2);
        return new Date(date + time);
    };

    extractDuration = (enteredTime) => {
        let today = new Date();
        let goalTime = this.addTimeToDate(today, enteredTime);
        
        if(goalTime - Date.now() <= 0) {
            today.setDate(new Date().getDate() + 1);
            goalTime = this.addTimeToDate(today, enteredTime);
        }
        return goalTime - Date.now();
    };

    isValidTime = (value) => {
        const pattern = /^(([0-1]?[0-9])|([2][0-3])):[0-5][0-9]$/;
        return pattern.test(value);
    };

    render() {
        let errorMessage = null;
        if(this.state.error) {
            errorMessage = <p className={classes.Error}>Please enter a time 
                in 24 hour format. Example: 17:30</p>;
        }

        return (
            <form className={classes.StartDay} onSubmit={this.formSubmissionHandler}>
                <label>
                    Time you want to work until: 
                    <input type='time' name='enteredTime' required 
                        placeholder='Time in 24 hour format'
                    />
                </label>
                {errorMessage}
                <Button btnType='SubmitStartDay' isSubmit>Submit</Button>
            </form>
        );
    }
}

export default StartDay;