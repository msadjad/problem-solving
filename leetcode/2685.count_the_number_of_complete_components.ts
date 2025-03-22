function countCompleteComponents(n: number, edges: number[][]): number {
    const nodeEdges: Set<number>[] = Array.from({length: n}, () => new Set<number>());
    for(let i=0 ; i<edges.length; i++) {
        const [a, b] = edges[i];
        nodeEdges[a].add(b);
        nodeEdges[b].add(a);
    }


    let completeComponents = 0;
    const foundComponent = Array.from({length: n}, () => false);

    for(let i=0; i<n; i++) {
        if(!foundComponent[i]) {
            const componentNodes = Array.from(getComponent(i, nodeEdges));
            let isComplete = true;
            for(let j=0 ; j<componentNodes.length; j++) {
                const first = componentNodes[j];
                foundComponent[first] = true;
                for(let k=j+1; k<componentNodes.length; k++) {
                    const second = componentNodes[k];
                    if(!nodeEdges[first].has(second) || !nodeEdges[second].has(first)) {
                        isComplete = false;
                    }
                }
            }

            if(isComplete) {
                completeComponents += 1;
            }
        }
    }

    return completeComponents;
};

function getComponent(start: number, nodeEdges: Set<number>[]) {
    const queue: number[] = [start];
    let queueStart = 0;
    const seenItems = new Set<number>([start]);

    while(queueStart < queue.length) {
        const item = queue[queueStart++];
        for(const neighbor of nodeEdges[item]) {
            if(!seenItems.has(neighbor)) {
                seenItems.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return seenItems;
}
