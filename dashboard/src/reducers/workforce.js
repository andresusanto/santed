const update = require('react-addons-update');

const initialState = {
    documentTitle: '',
};

const workforce = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_WORKFORCE_START':
            return state;
        case 'CREATE_WORKFORCE_SUCCESS':
            return state;
        case 'CREATE_WORKFORCE_FAILED':
            return state;
        default:
            return state;
    }
};

export default workforce;
