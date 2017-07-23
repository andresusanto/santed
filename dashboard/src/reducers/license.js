const update = require('react-addons-update');

const initialState = {
    phase: 'start',
    data: [],
};

const license = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LICENSE_START':
            return update(state, {
                phase: { $set: 'start' },
            });
        case 'GET_LICENSE_SUCCESS':
            return update(state, {
                phase: { $set: 'success' },
                data: { $set: action.payload.data.data.license },
            });
        case 'GET_LICENSE_FAILED':
            return state;
        default:
            return state;
    }
};

export default license;
