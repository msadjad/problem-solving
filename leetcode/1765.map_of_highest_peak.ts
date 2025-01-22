type Position = {
    row: number,
    column: number,
};

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
]

function highestPeak(isWater: number[][]): number[][] {
    let queue: Position[] = [];
    let processed = 0;
    const numberOfRows = isWater.length;
    const numberOfColumns = isWater[0].length;
    let heights = Array.from({ length: numberOfRows }).map(() => (new Array(numberOfColumns)).fill(-1));

    for (let row = 0; row < numberOfRows; row++) {
        for (let column = 0; column < numberOfColumns; column++) {
            if (isWater[row][column] === 1) {
                heights[row][column] = 0;
                ({queue, heights} = handleNeighbors(row, column, heights, queue, isWater));
            }
        }
    }

    while (processed != queue.length) {
        const point = queue[processed++];
        ({queue, heights} = handleNeighbors(point.row, point.column, heights, queue, isWater));
    }

    return heights;
};

function handleNeighbors(row: number, column: number, heights: number[][], queue: Position[], isWater: number[][]): {queue: Position[], heights: number[][]} {
    const numberOfRows = isWater.length;
    const numberOfColumns = isWater[0].length;

    for (let i = 0; i < DIRECTIONS.length; i++) {
        const neighborRow = row + DIRECTIONS[i][0];
        const neighborColumn = column + DIRECTIONS[i][1];
        if (isInBound(neighborRow, neighborColumn, numberOfRows, numberOfColumns) && isWater[neighborRow][neighborColumn] === 0 && heights[neighborRow][neighborColumn] === -1) {
            heights[neighborRow][neighborColumn] = heights[row][column] + 1;
            queue.push({ row: neighborRow, column: neighborColumn });
        }
    }

    return {queue, heights}
}

function isInBound(row: number, column: number, numberOfRows: number, numberOfColumns: number) {
    return row >= 0 && column >= 0 && row < numberOfRows && column < numberOfColumns;
}
