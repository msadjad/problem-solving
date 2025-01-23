function countServers(grid: number[][]): number {
    const numberOfRows = grid.length;
    const numberOfColumns = grid[0].length;
    const rowCount: number[] = (new Array(numberOfRows)).fill(0);
    const columnCount: number[] = (new Array(numberOfColumns)).fill(0);

    for (let row = 0; row < numberOfRows; row++) {
        for (let column = 0; column < numberOfColumns; column++) {
            if(grid[row][column] === 1) {
                rowCount[row] += 1;
                columnCount[column] += 1;
            }
        }
    }

    let count = 0;
    for (let row = 0; row < numberOfRows; row++) {
        for (let column = 0; column < numberOfColumns; column++) {
            if (grid[row][column] === 1 && (rowCount[row] > 1 || columnCount[column]> 1)) {
                count += 1;
            }
        }
    }

    return count;
}
