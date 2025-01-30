function magnificentSets(n: number, edges: number[][]): number {
    const graph: number[][] = Array.from({ length: n }, () => []);

    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i]
        graph[a - 1].push(b - 1);
        graph[b - 1].push(a - 1);
    }

    let isPossible = color(graph);
    if (!isPossible) {
        return -1;
    }

    const distances = Array.from({ length: n }, (_, i) => bfs(i, graph));
    const components = Array.from({ length: n }, () => -1);
    let componentNumber = 0;

    for (let i = 0; i < n; i++) {
        if (components[i] === -1) {
            components[i] = componentNumber++;
        }
        for (let j = 0; j < n; j++) {
            if (components[j] === -1 && distances[i][j] != Infinity) {
                components[j] = components[i];
            }
        }
    }

    const maxComponentDistances = Array.from({ length: componentNumber }, () => -1);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const component = components[i];
            if (distances[i][j] != Infinity) {
                maxComponentDistances[component] = Math.max(distances[i][j], maxComponentDistances[component])
            }
        }
    }

    const maxDistance = maxComponentDistances.reduce((sum, item) => sum + item + 1, 0);

    return maxDistance;
};

function color(graph: number[][]): boolean {
    const colors = new Array(graph.length);
    const queue: number[] = [];
    const notColored = new Set(Array.from({ length: graph.length }, (_, i) => i));
    let queuePosition = 0;
    while (notColored.size > 0) {
        const [current] = notColored;
        notColored.delete(current);

        colors[current] = 1;
        queue.push(current);
        while (queuePosition < queue.length) {
            const item = queue[queuePosition++];
            for (let i = 0; i < graph[item].length; i++) {
                const neighbor = graph[item][i];
                if (colors[neighbor] != undefined && colors[neighbor] == colors[item]) {
                    return false;
                }

                if (colors[neighbor] != undefined) {
                    continue;
                }

                colors[neighbor] = colors[item] === 1 ? 0 : 1;
                queue.push(neighbor);
                notColored.delete(neighbor);
            }
        }
    }

    return true;
}

function bfs(start: number, graph: number[][]): number[] {
    const queue: number[] = [];
    const distances = new Array(graph.length).fill(Infinity);
    const visited = new Set<number>();
    queue.push(start);
    visited.add(start);
    distances[start] = 0;
    let queuePosition = 0;

    while (queuePosition < queue.length) {
        const current = queue[queuePosition++];
        for (let i = 0; i < graph[current].length; i++) {
            const neighbor = graph[current][i];
            if (!visited.has(neighbor)) {
                distances[neighbor] = distances[current] + 1;
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return distances;
}
