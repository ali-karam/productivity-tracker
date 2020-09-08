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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ACTIVITY: return addActivity(state, action);
        case actionTypes.DELETE_ACTIVITY: return deleteActivity(state, action);
        default: return state;
    }
};

export default reducer;

