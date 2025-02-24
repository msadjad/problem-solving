function mostProfitablePath(edges: number[][], bob: number, amount: number[]): number {
    const numberOfNodes = amount.length;
    const neighbors = getNeighborMap(edges, numberOfNodes);
    
    const bobTime = new Map<number, number>();
    findBobPath(neighbors, bob, -1, 0, bobTime);
    
    return findMaxAliceScore(neighbors, 0, -1, 0, amount, bobTime);
};

function getNeighborMap(edges: number[][], numberOfNodes: number): Map<number, number[]> {
    const neighbors = new Map<number, number[]>();
    
    for(let i = 0; i < numberOfNodes; i++) {
        neighbors.set(i, []);
    }
    
    for(const [a, b] of edges) {
        neighbors.get(a)!.push(b);
        neighbors.get(b)!.push(a);
    }
    
    return neighbors;
}

function findBobPath(
    neighbors: Map<number, number[]>, 
    node: number, 
    parent: number, 
    time: number, 
    bobTime: Map<number, number>
): boolean {
    bobTime.set(node, time);
    
    if(node === 0) return true;
    
    for(const neighbor of neighbors.get(node)!) {
        if(neighbor !== parent) {
            if(findBobPath(neighbors, neighbor, node, time + 1, bobTime)) {
                return true;
            }
        }
    }
    
    bobTime.delete(node);
    return false;
}

function findMaxAliceScore(
    neighbors: Map<number, number[]>, 
    node: number, 
    parent: number, 
    time: number, 
    amount: number[], 
    bobTime: Map<number, number>
): number {
    let nodeValue = amount[node];
    
    if(bobTime.has(node)) {
        const bobArrivalTime = bobTime.get(node)!;
        if(time > bobArrivalTime) {
            nodeValue = 0;
        } else if(time === bobArrivalTime) {
            nodeValue = amount[node] / 2;
        }
    }
    
    const nextNodes = neighbors.get(node)!.filter(n => n !== parent);
    
    if(nextNodes.length === 0) {
        return nodeValue;
    }
    
    let maxChildValue = -Infinity;
    for(const neighbor of nextNodes) {
        const childValue = findMaxAliceScore(neighbors, neighbor, node, time + 1, amount, bobTime);
        maxChildValue = Math.max(maxChildValue, childValue);
    }
    
    return nodeValue + maxChildValue;
}
