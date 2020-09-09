import * as actionTypes from './actionTypes';

export const addActivity = (name, goal) => {
    return {
        type: actionTypes.ADD_ACTIVITY,
        activityName: name,
        goal: goal
    };
};

export const deleteActivity = (id) => {
    let activitiesData = localStorage.getItem('activities');
    activitiesData = JSON.parse(activitiesData);
    activitiesData = activitiesData.filter(activity => activity.id !== id);
    localStorage.setItem('activities', JSON.stringify(activitiesData));
    return {
        type: actionTypes.DELETE_ACTIVITY,
        id: id
    };
};

export const initializeActivities = () => {
    let activitiesData = localStorage.getItem('activities');
    activitiesData = JSON.parse(activitiesData);
    return {
        type: actionTypes.INITIALIZE_ACTIVITIES,
        activitiesData: activitiesData
    };
};

export const saveTime = (id, stopwatchStart, stopwatchTime, timerStart, timerTime) => {
    return {
        type: actionTypes.SAVE_TIME,
        id: id,
        stopwatchStart: stopwatchStart,
        stopwatchTime: stopwatchTime,
        timerStart: timerStart,
        timerTime: timerTime
    };
};

