const axios = require('axios');

const API_ENDPOINT = process.env.API_ENDPOINT;

const resolvers = {
    Query: {
        workschedule() {
            return axios
                .get(`${API_ENDPOINT}/workschedule_rule_check/find`)
                .then(result => result.data.map(data => Object.assign({
                    id: data._id,
                }, data)));
        },
        leave() {
            return axios
                .get(`${API_ENDPOINT}/leave/find`)
                .then(result => result.data.map(data => Object.assign({
                    id: data._id,
                }, data)));
        },
        redTicket() {
            return axios
                .get(`${API_ENDPOINT}/red_ticket/find`)
                .then(result => result.data.map(data => Object.assign({
                    id: data._id,
                }, data)));
        },
        license() {
            return axios
                .get(`${API_ENDPOINT}/license/find`)
                .then(result => result.data
                    .filter(data => data.firstName)
                    .map(data => Object.assign({
                        id: data._id,
                    }, data))
                );
        },
        miningClock() {
            return axios
                .get(`${API_ENDPOINT}/mining_clock/find`)
                .then(result => result.data.map(data => Object.assign({
                    id: data._id,
                }, data)));
        },
        project() {
            return axios
                .get(`${API_ENDPOINT}/project/find`)
                .then(result => result.data.map(data => Object.assign({
                    id: data._id,
                }, data)));
        },
    }
};

module.exports = resolvers;
