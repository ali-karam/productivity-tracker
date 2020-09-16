import * as actionTypes from '../actions/actionTypes';

const defineInitialState = () => {
    let initialState = {
        activities: [],
        dayTimerDuration: null
    };
    if(localStorage.hasOwnProperty('activities')) {
        initialState.activities = JSON.parse(localStorage.getItem('activities'));
    }
    if(localStorage.hasOwnProperty('dayTimer')) {
        let dayTimer = JSON.parse(localStorage.getItem('dayTimer'));
        let currentTimerTime = dayTimer.duration - 
            (Date.now() - dayTimer.stopwatchStart);
        if(currentTimerTime > 1000) {
            initialState.dayTimerDuration = dayTimer.duration;
        } else {
            localStorage.removeItem('dayTimer');
        }
    }
    return initialState;
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
                timerTime: action.timerTime,
                timerOn: action.timerOn
            },
            ...state.activities.slice(index + 1)
        ]
    }
};

const setDayTimerDuration = (state, action) => {
    return {
        ...state,
        activities: [...state.activities],
        dayTimerDuration: action.timerDuration
    };
};

const reducer = (state = defineInitialState(), action) => {
    switch(action.type) {
        case actionTypes.ADD_ACTIVITY: return addActivity(state, action);
        case actionTypes.DELETE_ACTIVITY: return deleteActivity(state, action);
        case actionTypes.SAVE_TIME: return saveTime(state, action);
        case actionTypes.SET_DAY_TIMER_DURATION: return setDayTimerDuration(state, action);
        default: return state;
    }
};

export default reducer;

