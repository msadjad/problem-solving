const DIRECTIONS = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function findMaxFish(grid: number[][]): number {
    let maxFish = 0;
    const visited: boolean[][] = Array.from({ length: grid.length }, () => new Array(grid[0].length).fill(false));

    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            maxFish = Math.max(maxFish, dfs(grid, visited, row, column));
        }
    }

    return maxFish;
}

function dfs(grid: number[][], visited: boolean[][], row: number, column: number): number {
    if (grid[row][column] === 0 || visited[row][column]) {
        return 0;
    }

    visited[row][column] = true;

    let fish = grid[row][column];

    for (let i = 0; i < DIRECTIONS.length; i++) {
        const nextRow = row + DIRECTIONS[i][0];
        const nextColumn = column + DIRECTIONS[i][1];
        if (isInBound(nextRow, nextColumn, grid.length, grid[0].length)) {
            fish += dfs(grid, visited, nextRow, nextColumn);
        }
    }

    return fish;
}

function isInBound(row: number, column: number, numberOfRows: number, numberOfColumns: number): boolean {
    return row >= 0 && column >= 0 && row < numberOfRows && column < numberOfColumns;
}
