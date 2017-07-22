import axios from 'axios';

class GraphQLClient {
    constructor(endpoint, dispatcher) {
        this.endpoint = endpoint;
        this.dispatcher = dispatcher;
    }

    dispatch(action) {
        return this.query(action.type, action.query);
    }

    query(actionType, query) {
        this.dispatcher({
            type: `${actionType}_START`,
        });

        return axios
            .post(this.endpoint, query)
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

export default GraphQLClient;
