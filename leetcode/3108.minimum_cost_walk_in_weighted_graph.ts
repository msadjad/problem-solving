function minimumCost(n: number, edges: number[][], query: number[][]): number[] {
    const neighbors: number[][] = Array.from({ length: n }, () => []);

    for (let i = 0; i < edges.length; i++) {
        const [a, b, _] = edges[i];
        neighbors[a].push(b);
        neighbors[b].push(a);
    }

    const components = Array.from({ length: n }, () => -1);
    let componentCount = 0;

    for (let i = 0; i < n; i++) {
        if (components[i] === -1) {
            const componentVertices = getComponentVertices(i, neighbors);
            for (const vertex of componentVertices) {
                components[vertex] = componentCount;
            }
            componentCount += 1;
        }
    }

    const componentWeight = new Array(componentCount);
    for(let i=0 ; i<edges.length; i++) {
        const component = components[edges[i][0]];
        if(componentWeight[component] === undefined) {
            componentWeight[component] = edges[i][2];
        } else {
            componentWeight[component] &= edges[i][2];
        }
    }

    const results: number[] = [];
    for(let i=0 ; i<query.length; i++) {
        const [a, b] = query[i];
        if(components[a] === components[b]) {
            results.push(componentWeight[components[a]]);
        } else {
            results.push(-1)
        }
    }
    
    return results;
}

function getComponentVertices(node: number, neighbors: number[][]): Set<number> { 
    const queue = [node];
    let queueStart = 0;
    const componentVertices: Set<number> = new Set<number>();
    componentVertices.add(node);

    while (queueStart < queue.length) {
        const first = queue[queueStart++];
        for (let i = 0; i < neighbors[first].length; i++) {
            const neighbor = neighbors[first][i];
            if (!componentVertices.has(neighbor)) {
                componentVertices.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return componentVertices;
}
