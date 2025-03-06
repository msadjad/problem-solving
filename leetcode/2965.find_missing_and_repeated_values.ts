function findMissingAndRepeatedValues(grid: number[][]): number[] {
    const length = grid.length;
    const allNumbers = new Array(length*length).fill(0);

    for(let i=0 ; i<length ; i++) {
        for(let j=0 ; j<length ; j++) {
            allNumbers[grid[i][j]-1]++;
        }
    }

    let a = -1, b = -1;
    for(let i=0 ; i<allNumbers.length; i++) {
        if(allNumbers[i] === 0) {
            b = i+1;
        }
        else if(allNumbers[i] === 2) {
            a = i+1;
        }
    } 

    return [a,b];
};
