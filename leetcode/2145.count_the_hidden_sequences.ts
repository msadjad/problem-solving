function numberOfArrays(differences: number[], lower: number, upper: number): number {
    let lowestNumber = 0;
    let highestNumber = 0;
    let current = 0;

    for(let i=0 ; i<differences.length; i++) {
        current += differences[i];
        lowestNumber = Math.min(lowestNumber, current);
        highestNumber = Math.max(highestNumber, current);
    }
    
    const differenceRange = highestNumber - lowestNumber;
    const range = upper - lower;

    return Math.max(range - differenceRange + 1, 0);
};
