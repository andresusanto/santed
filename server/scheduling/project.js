const _ = require('lodash');
const logger = require('../logger');
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

const calcSchedule = (requirements, miners) => {
    requirements = requirements || defaultRequirements;
    // flatten requirements
    const reqs = _.flatMap(requirements, (r) => {
        let q = Array(r.num);
        q.fill(r.license);
        return q;
    });

    let i;
    let supervisorIdx = {}, supervisor = [];
    _.some(miners, (miner, i) => {
        if (!supervisorIdx[miner.supervisor]) {
            supervisorIdx[miner.supervisor] = supervisor.length;
            supervisor.push(miner.supervisor);
        }
    });

    // first layer: supervisors
    // node numbers: 2 + idx
    // second layer: miners
    // node numbers: 2 + nsupervisor + idx
    // third layer: positions
    // node numbers: 2 + nsupervisor + nminers + idx

    const offset1 = 2;
    const offset2 = offset1 + supervisor.length;
    const offset3 = offset2 + miners.length;
    const nnodes = offset3 + reqs.length + 2;
    const source = 0;
    const sink = 1;

    const mcmf = new MinCostMaxFlow(nnodes);

    // source -> supervisors
    _.some(supervisor, (sup, i) => {
        mcmf.addEdge(source, i + offset1, Infinity, 0);
    });
    // supervisors -> miners
    _.some(miners, (miner, i) => {
        const isup = supervisorIdx[miner.supervisor] + offset1;
        mcmf.addEdge(isup, i + offset2, 1, 0);
    });
    // miners -> positions
    _.some(miners, (miner, i) => {
        _.some(reqs, (req, j) => {
            // only add edge if no license is needed or their licenses match
            if (!req || req === mapLicense(miner.position)) {
                mcmf.addEdge(i + offset2, j + offset3, 1, calcHeuristic(miner, req));
            }
        })
    });
    // positions -> sink
    _.some(reqs, (req, i) => {
        mcmf.addEdge(i + offset3, sink, 1, 0);
    });

    logger.info(`[SCHEDULING] Begin scheduling ${supervisor.length} supervisors, ${miners.length} miners, ${reqs.length} positions`);
    const mcmfResult = mcmf.calc(source, sink);
    // reconstruct flow from miners -> positions
    let assignments = [];
    _.some(miners, (miner, i) => {
        const idx = offset2 + i;
        _.some(mcmf.graph[idx], (edge) => {
            if (edge.f === 1) {
                const to = edge.to - offset3;
                if (0 <= to && to < reqs.length) {
                    assignments.push({
                        miner: miner,
                        position: reqs[to] || 'Additional',
                    });
                }
            }
        });
    });

    logger.info(`[SCHEDULING] Min Cost Max Flow Result:`, mcmfResult);
    logger.info(`[SCHEDULING] Assignments:`, assignments);
    return {
        requirements,
        assignments,
        cost: mcmfResult.flowCost,
    };
};

const calcHeuristic = (miner, license) => {
    return 0;
};

const mapLicense = (position) => {
    if (position.indexOf('LHD') !== -1) {
        return 'Mining Load Haul Dumper Tier 6 / License';
    }
    if (position.indexOf('Roofbolt') !== -1) {
        return 'Mining Roofbolter Tier 6 / License';
    }
    if (position.indexOf('CM') !== -1) {
        return 'Mining Continuous Miner Tier 6 / License';
    }
    if (position.indexOf('Shuttlecar') !== -1) {
        return 'Mining Shuttle Car Tier 6 / License';
    }
    return false;
};

const scheduleProject = (spec, models) => {
    const Miner = models.Miner.model;
    return Miner.find().limit(100).exec()
        .then((miners) => {
            return calcSchedule(spec.requirements, miners);
        });
};

module.exports = {
    scheduleProject,
};
