function findRedundantConnection(edges: number[][]): number[] {
    const colors: number[] = Array.from({length: edges.length + 1}, (_, i) => i);

    for(let i=0 ; i<edges.length ; i++) {
        const [a, b] = edges[i];
        if(colors[a] === colors[b]) {
            return edges[i];
        } else {
            const colorFrom = colors[a];
            const colorTo = colors[b];
            for(let edge=0 ; edge<colors.length; edge++) {
                if(colors[edge] === colorFrom) {
                    colors[edge] = colorTo;
                }
            }
        }
    }

    return [1, 1]
};
