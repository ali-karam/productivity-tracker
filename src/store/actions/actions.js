import * as actionTypes from './actionTypes';

export const addActivity = (name, goal) => {
    return {
        type: actionTypes.ADD_ACTIVITY,
        activityName: name,
        goal: goal
    };
};

export const deleteActivity = (id) => {
    return {
        type: actionTypes.DELETE_ACTIVITY,
        id: id
    };
};