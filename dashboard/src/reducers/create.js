const update = require('react-addons-update');

const initialState = {
    phase: '',
};

const create = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT_START':
            return update(state, {
                phase: { $set: 'start' },
            });
        case 'CREATE_PROJECT_SUCCESS':
            return update(state, {
                phase: { $set: 'success' },
            });
        case 'CREATE_PROJECT_FAILED':
        console.log(action);
            return update(state, {
                phase: { $set: 'failed' },
            });
        default:
            return state;
    }
};

export default create;
