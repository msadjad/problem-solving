function maxPoints(grid: number[][], queries: number[]): number[] {
    const m = grid.length;
    const n = grid[0].length;
    
    // Create a sorted array of [query value, original index]
    const sortedQueries = queries.map((val, idx) => [val, idx])
        .sort((a, b) => a[0] - b[0]);
    
    // Directions for BFS: up, right, down, left
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    // Min heap for BFS using a custom comparator
    const minHeap: [number, number, number][] = [[grid[0][0], 0, 0]]; // [value, row, col]
    const visited = new Set<string>();
    visited.add("0,0");
    
    const result = new Array(queries.length).fill(0);
    let cellsVisited = 0;
    
    // Process queries in ascending order
    for (const [queryVal, originalIdx] of sortedQueries) {
        // Process all cells with values less than the current query
        while (minHeap.length > 0 && minHeap[0][0] < queryVal) {
            // Extract min element
            const [val, row, col] = extractMin(minHeap);
            cellsVisited++;
            
            // Add all unvisited neighbors to the heap
            for (const [dx, dy] of directions) {
                const newRow = row + dx;
                const newCol = col + dy;
                const key = `${newRow},${newCol}`;
                
                if (
                    newRow >= 0 && newRow < m && 
                    newCol >= 0 && newCol < n && 
                    !visited.has(key)
                ) {
                    visited.add(key);
                    minHeap.push([grid[newRow][newCol], newRow, newCol]);
                    siftUp(minHeap, minHeap.length - 1);
                }
            }
        }
        
        // Update the result for this query
        result[originalIdx] = cellsVisited;
    }
    
    return result;
}

// Helper function to extract minimum element from the heap
function extractMin(heap: [number, number, number][]): [number, number, number] {
    const min = heap[0];
    const last = heap.pop()!;
    
    if (heap.length > 0) {
        heap[0] = last;
        siftDown(heap, 0);
    }
    
    return min;
}

// Helper function to maintain heap property downward
function siftDown(heap: [number, number, number][], idx: number): void {
    const len = heap.length;
    let smallest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
    
    if (left < len && heap[left][0] < heap[smallest][0]) {
        smallest = left;
    }
    
    if (right < len && heap[right][0] < heap[smallest][0]) {
        smallest = right;
    }
    
    if (smallest !== idx) {
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        siftDown(heap, smallest);
    }
}

// Helper function to maintain heap property upward
function siftUp(heap: [number, number, number][], idx: number): void {
    if (idx === 0) return;
    
    const parentIdx = Math.floor((idx - 1) / 2);
    
    if (heap[parentIdx][0] > heap[idx][0]) {
        [heap[parentIdx], heap[idx]] = [heap[idx], heap[parentIdx]];
        siftUp(heap, parentIdx);
    }
}
