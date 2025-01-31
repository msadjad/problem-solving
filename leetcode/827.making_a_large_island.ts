const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function largestIsland(grid: number[][]): number {
    const components = Array.from({length: grid.length}, () => new Array(grid[0].length).fill(-1));
    const colorSize = [];
    let color = 0;

    for(let row=0 ; row < grid.length ; row++) {
        for(let column=0 ; column < grid[0].length ; column++) {
            if(components[row][column] === -1 && grid[row][column] === 1) {
                components[row][column] = color++;
                colorSize.push(dfs(row, column, components, grid));
            }
        }
    }

    let maxComponent = colorSize.reduce((max, colorSize) => Math.max(max, colorSize), 0);

    for(let row=0 ; row < grid.length ; row++) {
        for(let column=0 ; column < grid[0].length ; column++) {
            if(grid[row][column] === 0) {
                const neighbors = getAdjacentColors(row, column, components);
                let sum = 0;
                for(color of neighbors) {
                    sum += colorSize[color];
                }

                maxComponent = Math.max(maxComponent, sum + 1);
            }
        }
    }

    return maxComponent;
};

function dfs(row: number, column: number, components: number[][], grid: number[][]): number {
    let count = 1;

    for(let i=0 ; i<DIRECTIONS.length ; i++) {
        const currentRow = row + DIRECTIONS[i][0];
        const currentColumn = column + DIRECTIONS[i][1];

        if(isInBound(currentRow, currentColumn, grid.length, grid[0].length) 
            && grid[currentRow][currentColumn] === 1
            && components[currentRow][currentColumn] === -1) {
            components[currentRow][currentColumn] = components[row][column];
            count += dfs(currentRow, currentColumn, components, grid);
        }
    }

    return count;
}

function getAdjacentColors(row: number, column: number, components: number[][]): Set<number> {
    let neighbors = new Set<number>();

    for(let i=0 ; i<DIRECTIONS.length ; i++) {
        const currentRow = row + DIRECTIONS[i][0];
        const currentColumn = column + DIRECTIONS[i][1];

        if(isInBound(currentRow, currentColumn, components.length, components[0].length) && 
            components[currentRow][currentColumn] != -1) {
                neighbors.add(components[currentRow][currentColumn])
            }
    }

    return neighbors;
}

function isInBound(row: number, column: number, width: number, height: number) {
    return row >= 0 && row < height && column >= 0 && column < width;
}
