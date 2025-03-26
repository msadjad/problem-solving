function minOperations(grid: number[][], x: number): number {
    const m = grid.length;
    const n = grid[0].length;
    const allNumbers: number[] = [];

    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            allNumbers.push(grid[i][j]);
        }
    }  

    allNumbers.sort((a, b) => a - b);

    const mid = Math.floor(allNumbers.length / 2);
    let sum = Math.floor(Math.abs(allNumbers[mid] - allNumbers[0]) / x);

    for(let i=1 ; i<allNumbers.length; i++) {
        const diff = allNumbers[i] - allNumbers[i-1];
        if(diff % x != 0) {
            return -1;
        }

        sum += Math.floor(Math.abs(allNumbers[mid] - allNumbers[i]) / x);
    }

    return sum;
};
