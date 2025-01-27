function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const allPrerequisites: boolean[][] = Array.from({ length: numCourses }, () => new Array<boolean>(numCourses).fill(false));

    for (let i = 0; i < prerequisites.length; i++) {
        graph[prerequisites[i][1]].push(prerequisites[i][0]);
    }

    for (let i = 0; i < numCourses; i++) {
        const dfsResult = dfs(graph, i, new Set<number>());
        for (let j = 0; j < dfsResult.prerequisites.length; j++) {
            allPrerequisites[dfsResult.prerequisites[j]][i] = true;
        }
    }

    const result: boolean[] = [];
    for (let i = 0; i < queries.length; i++) {
        result.push(allPrerequisites[queries[i][0]][queries[i][1]]);
    }

    return result;
};

function dfs(graph: number[][], start: number, visited: Set<number>): { prerequisites: number[], visited: Set<number> } {
    if (graph[start].length === 0) {
        return { prerequisites: [], visited };
    }

    let prerequisites: number[] = [];
    let newPrerequisites: number[] = [];
    let updatedVisited = visited;
    for (let i = 0; i < graph[start].length; i++) {
        if (!updatedVisited.has(graph[start][i])) {
            updatedVisited.add(graph[start][i])
            prerequisites.push(graph[start][i]);
            ({prerequisites: newPrerequisites, visited: updatedVisited} = dfs(graph, graph[start][i], updatedVisited));
            prerequisites = [...prerequisites, ...newPrerequisites]
        }
    }

    return { prerequisites, visited: updatedVisited };
}
