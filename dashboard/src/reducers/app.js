const update = require('react-addons-update');

const initialState = {
    documentTitle: '',
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TITLE':
            return update(state, {
                documentTitle: { $set: action.title },
            });
        default:
            return state;
    }
};

export default app;
