type Neighbor = {
    neighbor: number,
    time: number,
};

function isNeighborFurther(a: Neighbor, b: Neighbor) {
    return a.time > b.time;
}

function countPaths(n: number, roads: number[][]): number {
    const MOD = 1e9 + 7;
    
    // Build adjacency list
    const graph: Neighbor[][] = Array.from({ length: n }, () => []);
    for (const road of roads) {
        const [start, end, time] = road;
        graph[start].push({ neighbor: end, time });
        graph[end].push({ neighbor: start, time });
    }

    // Min-Heap (priority queue) for Dijkstra
    const minHeap = new MinHeap<[number, number]>((a, b) => a[0] > b[0]);
    
    // Store shortest time to each node
    const shortestTime: number[] = Array(n).fill(Number.MAX_SAFE_INTEGER);
    // Number of ways to reach each node in shortest time
    const pathCount: number[] = Array(n).fill(0);

    shortestTime[0] = 0;
    pathCount[0] = 1;

    minHeap.insert([0, 0]); // {time, node}

    while (minHeap.size() > 0) {
        const [currTime, currNode] = minHeap.extractMin()!;

        // Skip outdated distances
        if (currTime > shortestTime[currNode]) continue;

        for (const { neighbor: neighborNode, time: roadTime } of graph[currNode]) {
            const newTime = currTime + roadTime;

            if (newTime < shortestTime[neighborNode]) {
                shortestTime[neighborNode] = newTime;
                pathCount[neighborNode] = pathCount[currNode];
                minHeap.insert([newTime, neighborNode]);
            } else if (newTime === shortestTime[neighborNode]) {
                pathCount[neighborNode] = (pathCount[neighborNode] + pathCount[currNode]) % MOD;
            }
        }
    }

    return pathCount[n - 1];
}

class MinHeap<T> {
    private heap: T[];

    constructor(private isBigger: (a: T, b: T) => boolean) {
        this.heap = [];
    }

    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    private getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    private swap(index1: number, index2: number): void {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    insert(value: T): void {
        this.heap.push(value);
        this.heapifyUp();
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.isBigger(this.heap[parentIndex], this.heap[index])) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    extractMin(): T | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop()!;

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return min;
    }

    private heapifyDown(): void {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            if (
                rightChildIndex < this.heap.length &&
                this.isBigger(this.heap[smallerChildIndex], this.heap[rightChildIndex])
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.isBigger(this.heap[index], this.heap[smallerChildIndex])) {
                this.swap(index, smallerChildIndex);
                index = smallerChildIndex;
            } else {
                break;
            }
        }
    }

    peek(): T | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size(): number {
        return this.heap.length;
    }
}
