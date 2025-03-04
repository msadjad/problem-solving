function checkPowersOfThree(n: number): boolean {
    const powersOf3 = Array.from({length: 16}, (_, i) => Math.pow(3, i));

    const possibleNumbers = getAllPossibleNumbers(powersOf3);

    return possibleNumbers.has(n);

    return false;
};

function getAllPossibleNumbers(powersOf3: number[]): Set<number> {
    const length = powersOf3.length;
    const allPossible = new Set<number>();
    const maxAllOptions = Math.pow(2, length) - 1;
    for(let i=0 ; i<maxAllOptions ; i++) {
        const subSet = i.toString(2).padStart(length, '0');
        let sum = 0;
        for(let j=0; j<subSet.length; j++) {
            if(subSet[j] === '1') {
                sum += powersOf3[j];
            }
        }
        allPossible.add(sum)
    }
    return allPossible;
}
