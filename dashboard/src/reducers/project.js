const update = require('react-addons-update');

const initialState = {
    phase: 'start',
    data: [],
};

const project = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROJECT_START':
            return update(state, {
                phase: { $set: 'start' },
            });
        case 'GET_PROJECT_SUCCESS':
            return update(state, {
                phase: { $set: 'success' },
                data: { $set: action.payload.data.data.project },
            });
        case 'GET_PROJECT_FAILED':
            return state;
        default:
            return state;
    }
};

export default project;
