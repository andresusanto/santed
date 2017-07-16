const update = require('react-addons-update');

const initialState = {
    opennedMenu: '',
};

const header = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_HEADER_MENU':
            return update(state, {
                opennedMenu: { $set: action.title },
            });
        case 'CLOSE_HEADER_MENU':
            return update(state, {
                opennedMenu: { $set: '' },
            });
        default:
            return state;
    }
};

export default header;
