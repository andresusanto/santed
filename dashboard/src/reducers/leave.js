const update = require('react-addons-update');

const initialState = {
    phase: 'start',
    data: [],
};

const leave = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LEAVE_START':
            return update(state, {
                phase: { $set: 'start' },
            });
        case 'GET_LEAVE_SUCCESS':
            return update(state, {
                phase: { $set: 'success' },
                data: { $set: action.payload.data.data.leave },
            });
        case 'GET_LEAVE_FAILED':
            return state;
        default:
            return state;
    }
};

export default leave;
