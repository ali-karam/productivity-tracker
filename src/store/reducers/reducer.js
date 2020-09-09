import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activities: []
};

const addActivity = (state, action) => {
    return {
        ...state,
        activities: [
            ...state.activities,
            {
                activityName: action.activityName,
                goal: +action.goal, 
                id: `${action.activityName}_${new Date().getTime()}`
            }
        ]
    }
};

const deleteActivity = (state, action) => {
    const updatedActivities = state.activities.filter(act => 
        act.id !== action.id);
    return {
        ...state, 
        activities: updatedActivities
    };
};

const saveTime = (state, action) => {
    const index = state.activities.findIndex(el => el.id === action.id);
    return {
        ...state,
        activities: [
            ...state.activities.slice(0, index),
            {
                ...state.activities[index],
                id: action.id,
                stopwatchStart: action.stopwatchStart,
                stopwatchTime: action.stopwatchTime,
                timerStart: action.timerStart,
                timerTime: action.timerTime
            },
            ...state.activities.slice(index + 1)
        ]
    }
};

const initializeActivities = (state, action) => {
    return {
        ...state, 
        activities: action.activitiesData
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ACTIVITY: return addActivity(state, action);
        case actionTypes.DELETE_ACTIVITY: return deleteActivity(state, action);
        case actionTypes.SAVE_TIME: return saveTime(state, action);
        case actionTypes.INITIALIZE_ACTIVITIES: return initializeActivities(state, action);
        default: return state;
    }
};

export default reducer;

