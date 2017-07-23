const update = require('react-addons-update');

const initialState = {
    phase: 'start',
    data: [],
};

const redTicket = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RED_TICKET_START':
            return update(state, {
                phase: { $set: 'start' },
            });
        case 'GET_RED_TICKET_SUCCESS':
            return update(state, {
                phase: { $set: 'success' },
                data: { $set: action.payload.data.data.redTicket },
            });
        case 'CREATE_WORKFORCE_FAILED':
            return state;
        default:
            return state;
    }
};

export default redTicket;
