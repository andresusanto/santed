const update = require('react-addons-update');

const initialState = {
    phase: 'start',
    data: [],
};

const clocking = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MINING_CLOCK_START':
            return update(state, {
                phase: { $set: 'start' },
            });
        case 'GET_MINING_CLOCK_SUCCESS':
            return update(state, {
                phase: { $set: 'success' },
                data: { $set: action.payload.data.data.miningClock },
            });
        case 'GET_MINING_CLOCK_FAILED':
            return state;
        default:
            return state;
    }
};

export default clocking;
