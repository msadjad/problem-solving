function countSymmetricIntegers(low: number, high: number): number {
    let count = 0;
    for(let i=low ; i<=high; i++) {
        count += isSymmetric(i) ? 1 : 0;
    }

    return count;
};

function isSymmetric(value: number): boolean {
    const valueString = value.toString();
    const length = valueString.length;
    if(length % 2 === 1) {
         return false;
    }

    let sumFirstPart = 0, sumSecondPart = 0;
    for(let i=0 ; i<length / 2; i++) {
        sumFirstPart += parseInt(valueString[i]);
        sumSecondPart += parseInt(valueString[i + length / 2]);
    }

    return sumFirstPart === sumSecondPart;
}
