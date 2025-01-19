const DIRECTIONS = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0]
];

type Block = {
    row: number,
    column: number,
    height: number,
}

function trapRainWater(heightMap: number[][]): number {
    const NUMBER_OF_ROWS = heightMap.length;
    const NUMBER_OF_COLUMNS = heightMap[0].length;
    const visited = Array.from({ length: NUMBER_OF_ROWS }, () => new Array(NUMBER_OF_COLUMNS).fill(0));
    const boundary = new MinHeap();

    for (let i = 0; i < NUMBER_OF_COLUMNS; i++) {
        boundary.push({
            row: 0,
            column: i,
            height: heightMap[0][i],
        });
        visited[0][i] = 1;

        if (NUMBER_OF_ROWS > 1) {
            boundary.push({
                row: NUMBER_OF_ROWS - 1,
                column: i,
                height: heightMap[NUMBER_OF_ROWS - 1][i],
            });
            visited[NUMBER_OF_ROWS - 1][i] = 1;
        }
    }

    for (let i = 1; i < NUMBER_OF_ROWS - 1; i++) {
        boundary.push({
            row: i,
            column: 0,
            height: heightMap[i][0],
        });
        visited[i][0] = 1;

        boundary.push({
            row: i,
            column: NUMBER_OF_COLUMNS - 1,
            height: heightMap[i][NUMBER_OF_COLUMNS - 1],
        });
        visited[i][NUMBER_OF_COLUMNS - 1] = 1;
    }

    let totalWaterVolume = 0;

    while (!boundary.isEmpty()) {
        const current = boundary.pop();
        for (let direction = 0; direction < 4; direction++) {
            const neighborRow = current.row + DIRECTIONS[direction][0]
            const neighborColumn = current.column + DIRECTIONS[direction][1]

            if (isValidCell(neighborRow, neighborColumn, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS) && !visited[neighborRow][neighborColumn]) {
                const neighborHeight = heightMap[neighborRow][neighborColumn];
                if (neighborHeight < current.height) {
                    totalWaterVolume += current.height - neighborHeight;
                }
                boundary.push({
                    row: neighborRow,
                    column: neighborColumn,
                    height: Math.max(neighborHeight, current.height),
                })

                visited[neighborRow][neighborColumn] = 1;
            }
        }
    }

    return totalWaterVolume;
};

function isValidCell(row: number, column: number, numberOfRows: number, numberOfColumns: number) {
    return row >= 0 && column >= 0 && row < numberOfRows && column < numberOfColumns;
}

class MinHeap {
    private heap: Block[] = [];

    push(item: Block) {
        this.heap.push(item);
        this.heap.sort((a, b) => a.height - b.height);
    }

    pop() {
        return this.heap.shift()!;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}
