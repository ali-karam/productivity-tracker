import React from 'react';
import classes from './AddActivity.module.css';

const addActivity = props => {
    const formSubmissionHandler = (event) => {
        event.preventDefault();

        const formData = {
            activityName: event.target.activityName.value,
            goal: event.target.goal.value
        };
        props.addActivity(formData);
    };

    return (
        <React.Fragment>
            <h2 className={classes.FormTitle}>Add Activity</h2>
            <form onSubmit={formSubmissionHandler}>
                <div className={classes.FormControl}>
                    <label>
                        Activity Name:
                        <input type="text" name="activityName"/>
                    </label>
                </div>
                <div className={classes.FormControl}>
                    <label>
                        Goal:
                        <input type="number" name="goal"/>
                    </label>
                </div>
                <button 
                    className={classes.FormSubmit} 
                    type="submit">Add Activity
                </button>
            </form>
        </React.Fragment>
    );
};

export default addActivity;