function smallestNumber(pattern: string): string {
    const numbersLeft = new Set<number>(Array.from({length: 9}, (_, i) => i + 1));   
    const possibleNumbers = getAllNumbers(pattern, numbersLeft, 0);
    const min = Array.from(possibleNumbers).reduce((min, value) => min < value ? min : value, "999999999999999");

    return min;
};

function getAllNumbers(pattern: string, numbersLeft: Set<number>, position: number): Set<string> {
    const results = new Set<string>();

    if(position === pattern.length) {
        for(let numberLeft of numbersLeft) {
            results.add(numberLeft.toString())
        }

        return results;
    }

    const cloneNumbersLeft = new Set<number>(numbersLeft);

    for(const numberLeft of numbersLeft) {
        cloneNumbersLeft.delete(numberLeft);
        const allPossibleNumbers = getAllNumbers(pattern, cloneNumbersLeft, position + 1);

        for(const possibleNumber of allPossibleNumbers) {
            if((pattern[position] === 'D' && Number(possibleNumber[0]) > numberLeft) 
            || (pattern[position] === 'I' && Number(possibleNumber[0]) < numberLeft)){
                continue;
            }

            results.add(numberLeft.toString() + possibleNumber)
        }

        cloneNumbersLeft.add(numberLeft);
    }

    return results; 
}
