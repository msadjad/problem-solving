type Node = {
    index: number,
    distance: number,
};

function maximumInvitations(favorite: number[]): number {
    const n = favorite.length;
    const likedBy = Array.from({ length: n }, () => []);

    for (let i = 0; i < n; i++) {
        likedBy[favorite[i]].push(i);
    }

    let longestCycle: number = 0;
    let twoCycleInvitation: number = 0;
    const visited = new Map<number, number>();

    for (let person = 0; person < n; person++) {
        if (!visited.has(person)) {
            const visitedPersons = new Map<number, number>();
            let current = person;
            let distance = 0;

            while (!visited.has(current)) {
                visited.set(current, distance);
                visitedPersons.set(current, distance++);
                const nextPerson = favorite[current];

                if (visitedPersons.has(nextPerson)) {
                    const cycleLength = distance - (visitedPersons.get(nextPerson) ?? 0);
                    longestCycle = Math.max(longestCycle, cycleLength);

                    if (cycleLength === 2) {
                        let visitedNodes = new Set<number>([current, nextPerson]);
                        let distance1: number, distance2: number;
                        ({ maxDistance: distance1, visitedNodes } = bfs(likedBy, current, visitedNodes));
                        ({ maxDistance: distance2, visitedNodes } = bfs(likedBy, nextPerson, visitedNodes));
                        twoCycleInvitation += 2 + distance1 + distance2;
                    }
                    break;
                }
                current = nextPerson;
            }
        }
    }

    return Math.max(longestCycle, twoCycleInvitation);
}

function bfs(graph: number[][], startNode: number, visitedNodes: Set<number>): { visitedNodes: Set<number>, maxDistance: number } {
    const queue: Node[] = [];
    queue.push({ index: startNode, distance: 0 });
    let maxDistance = 0;

    while (queue.length > 0) {
        const { index: current, distance } = queue.shift()!;
        for (const neighbor of graph[current]) {
            if (!visitedNodes.has(neighbor)) {
                visitedNodes.add(neighbor);
                queue.push({ index: neighbor, distance: distance + 1 });
                maxDistance = Math.max(maxDistance, distance + 1);
            }
        }
    }

    return { visitedNodes, maxDistance };
}
