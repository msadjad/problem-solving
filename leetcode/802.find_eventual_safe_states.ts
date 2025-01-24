enum Type {
    TERMINAL,
    SAFE_NODE,
    NOT_SAFE,
    NOT_CHECKED,
    PROCESSING,
};

function eventualSafeNodes(graph: number[][]): number[] {
    const length = graph.length;
    let types: Type[] = new Array(length).fill(Type.NOT_CHECKED);

    const safeNodes: number[] = [];
    for(let i=0 ; i<length ; i++) {
        types = dfs(graph, types, i);
        if(types[i] === Type.SAFE_NODE || types[i] === Type.TERMINAL) {
            safeNodes.push(i);
        }
    }

    return safeNodes;    
};

function dfs(graph: number[][], types: Type[], start: number): Type[] {
    if(types[start] === Type.PROCESSING) {
        types[start] = Type.NOT_SAFE;
        return types;
    }

    if(types[start] != Type.NOT_CHECKED) {
        return types;
    }

    if(graph[start].length === 0) {
        types[start] = Type.TERMINAL;
        return types;
    }

    types[start] = Type.PROCESSING;
    for(let i=0 ; i<graph[start].length ; i++) {
        const child = graph[start][i];
        types = dfs(graph, types, child);
        if(types[child] === Type.NOT_SAFE) {
            types[start] = Type.NOT_SAFE;
            return types;
        }   
    }

    types[start] = Type.SAFE_NODE;
    return types;
}
