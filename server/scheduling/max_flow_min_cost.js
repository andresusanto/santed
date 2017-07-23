// Javascript version ported from https://github.com/indy256/codelibrary/blob/master/cpp/MinCostFlow.cpp
// The original code is licensed under The Unlicense

const PriorityQueue = require('priorityqueuejs');

class Edge {
    constructor(to, f, cap, cost, rev) {
        this.to = to;
        this.f = f;
        this.cap = cap;
        this.cost = cost;
        this.rev = rev;
    }
}

class MinCostMaxFlow {
    constructor(maxnodes) {
        this.nodes = maxnodes;
        this.prio = new Array(maxnodes);
        this.curflow = new Array(maxnodes);
        this.prevedge = new Array(maxnodes);
        this.prevnode = new Array(maxnodes);
        this.q = new Array(maxnodes);
        this.pot = new Array(maxnodes);
        this.inqueue = new Array(maxnodes);
        this.graph = new Array(maxnodes);

        this.prio.fill(0);
        this.curflow.fill(0);
        this.prevedge.fill(0);
        this.prevnode.fill(0);
        this.q.fill(0);
        this.pot.fill(0);
        this.inqueue.fill(0);
        this.graph.fill(0);
    }

    addEdgeList(v, edge) {
        if (!this.graph[v]) {
            this.graph[v] = [edge];
        } else {
            this.graph[v].push(edge);
        }
    }

    addEdge(s, t, cap, cost) {
        const a = new Edge(t, 0, cap, cost, this.graph[t] && this.graph[t].length);
        const b = new Edge(s, 0, 0, -cost, this.graph[s] && this.graph[s].length);
        this.addEdgeList(s, a);
        this.addEdgeList(t, b);
    }

    calc(s, t, maxf) {
        let flow = 0, flowCost = 0, i;
        maxf = maxf || Infinity;
        while (flow < maxf) {
            let q = new PriorityQueue((a, b) => {
                return a.d - b.d;
            });
            q.enq({ d: 0, u: s });
            this.prio.fill(Infinity);
            this.prio[s] = 0;
            this.curflow[s] = Infinity;
            while (q.size() > 0) {
                let cur = q.deq();
                let d = cur.d;
                let u = cur.u;
                if (d != this.prio[u]) {
                    continue;
                }
                let deg = this.graph[u].length || 0;
                for (i = 0; i < deg; ++i) {
                    let e = this.graph[u][i];
                    let v = e.to;
                    if (e.cap <= e.f) {
                        continue;
                    }
                    let nprio = this.prio[u] + e.cost + this.pot[u] - this.pot[v];
                    if (this.prio[v] > nprio) {
                        this.prio[v] = nprio;
                        q.enq({ d: nprio, u: v });
                        this.prevnode[v] = u;
                        this.prevedge[v] = i;
                        this.curflow[v] = Math.min(this.curflow[u], e.cap - e.f);
                    }
                }
            }
            if (this.prio[t] === Infinity) {
                break;
            }
            for (i = 0; i < this.nodes; ++i) {
                this.pot[i] += this.prio[i];
            }
            let df = Math.min(this.curflow[t], maxf - flow);
            flow += df;
            let v;
            for (v = t; v !== s; v = this.prevnode[v]) {
                let e = this.graph[this.prevnode[v]][this.prevedge[v]];
                e.f += df;
                this.graph[v][e.rev].f -= df;
                flowCost += df * e.cost;
            }
        }

        // TODO: return filled edges
        return {
            flow,
            flowCost,
        };
    }
}

// test
let capacity = [[0, 3, 2], [0, 0, 2], [0, 0, 0]];
let nodes = 3;
let mcmf = new MinCostMaxFlow(nodes);
let i, j;
for (i = 0; i < nodes; ++i) {
    for (j = 0; j < nodes; ++j) {
        if (capacity[i][j] !== 0) {
            mcmf.addEdge(i, j, capacity[i][j], 1);
        }
    }
}
let s = 0, t = 2;
let res = mcmf.calc(s, t, Infinity);
console.log(res);
