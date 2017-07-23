import axios from 'axios';

class RestClient {
    constructor(endpoint, dispatcher) {
        this.endpoint = endpoint;
        this.dispatcher = dispatcher;
    }

    dispatch(action) {
        return this.request(action.type, action.payload, action.resource);
    }

    request(actionType, payload, resource) {
        this.dispatcher({
            type: `${actionType}_START`,
        });

        return axios
            .post(`${this.endpoint}${resource}`, payload)
            .then(payload => {
                this.dispatcher({
                    type: `${actionType}_SUCCESS`,
                    payload,
                });
            })
            .catch(err => {
                this.dispatcher({
                    type: `${actionType}_FAILED`,
                    err,
                });
            });
    }
}

export default RestClient;
