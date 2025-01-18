const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

type Position = {
    row: number;
    column: number;
};

function minCost(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const distances = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
    const queue = new MinHeap();

    distances[0][0] = 0;
    queue.push({ position: { row: 0, column: 0 }, cost: 0 });

    while (!queue.isEmpty()) {
        const { position, cost } = queue.pop();

        for (let i = 0; i < 4; i++) {
            const nextRow = position.row + DIRECTIONS[i][0];
            const nextCol = position.column + DIRECTIONS[i][1];

            if (isInBound({ row: nextRow, column: nextCol }, rows, cols)) {
                const nextCost = cost + (grid[position.row][position.column] - 1 === i ? 0 : 1);

                if (nextCost < distances[nextRow][nextCol]) {
                    distances[nextRow][nextCol] = nextCost;
                    queue.push({ position: { row: nextRow, column: nextCol }, cost: nextCost });
                }
            }
        }
    }

    return distances[rows - 1][cols - 1];
}

function isInBound(position: Position, rows: number, cols: number): boolean {
    return position.row >= 0 && position.row < rows && position.column >= 0 && position.column < cols;
}

class MinHeap {
    private heap: { position: Position; cost: number }[] = [];

    push(node: { position: Position; cost: number }) {
        this.heap.push(node);
        this.heap.sort((a, b) => a.cost - b.cost); // Min-heap property
    }

    pop() {
        return this.heap.shift()!;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}
