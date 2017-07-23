const MinCostMaxFlow = require('./min_cost_max_flow');

const defaultRequirements = [{
    license: false, // anything will do
    num: 3,
}, {
    license: 'Mining Load Haul Dumper Tier 6 / License',
    num: 1,
}, {
    license: 'Mining Roofbolter Tier 6 / License',
    num: 1,
}, {
    license: 'Mining Continuous Miner Tier 6 / License',
    num: 1,
}, {
    license: 'Mining Shuttle Car Tier 6 / License',
    num: 3,
}];

const createProject = (requirements, Miner) => {
    requirements = requirements || defaultRequirements;
    const mcmf = new MinCostMaxFlow(2000);

    // get miners
    
};

module.exports = {
    createProject,
};
