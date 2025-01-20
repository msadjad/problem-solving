type Position = {
    row: number,
    column: number,
}

function firstCompleteIndex(arr: number[], mat: number[][]): number {
    const positions = new Map<number, Position>();
    const NUMBER_OF_ROWS = mat.length;
    const NUMBER_OF_COLUMNS = mat[0].length;
    const rowsLeft = new Array(NUMBER_OF_ROWS).fill(NUMBER_OF_COLUMNS);
    const columnsLeft = new Array(NUMBER_OF_COLUMNS).fill(NUMBER_OF_ROWS);

    for(let row=0 ; row<NUMBER_OF_ROWS; row++) {
        for(let column=0 ; column<NUMBER_OF_COLUMNS ; column++){
            positions.set(mat[row][column], { row, column});
        }
    }

    for(let i=0 ; i<arr.length; i++) {
        const position = positions.get(arr[i]) ?? {row: -1, column: -1};

        rowsLeft[position.row] -=1;
        columnsLeft[position.column] -=1;

        if(rowsLeft[position.row] == 0 || columnsLeft[position.column] == 0) {
            return i;
        }
    }

    return -1;
};
