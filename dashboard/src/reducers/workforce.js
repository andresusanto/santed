const update = require('react-addons-update');

const initialState = {
    phase: 'start',
    data: [],
};

const workforce = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WORKFORCE_START':
            return update(state, {
                phase: { $set: 'start' },
            });
        case 'GET_WORKFORCE_SUCCESS':
            return update(state, {
                phase: { $set: 'success' },
                data: { $set: action.payload.data.data.workschedule },
            });
        case 'CREATE_WORKFORCE_FAILED':
            return state;
        default:
            return state;
    }
};

export default workforce;
