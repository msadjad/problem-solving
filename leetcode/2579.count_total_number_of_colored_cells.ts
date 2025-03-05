function coloredCells(n: number): number {
    let result = 1;

    for(let i=0 ; i<n; i++) {
        result += 4 * i;
    }

    return result;
};
