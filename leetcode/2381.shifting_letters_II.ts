function shiftingLetters(s: string, shifts: number[][]): string {
    const length = s.length;
    const diffArray = (new Array(length)).fill(0);
    const increase = 1;

    for (const shift of shifts) {
        const [start, end, direction] = [shift[0], shift[1], shift[2]];

        const changeFromStart = (direction === increase ? 1 : -1);
        const changeFromEnd = (direction === increase ? -1 : 1);

        diffArray[start] += changeFromStart;
        if (end + 1 < length) {
            diffArray[end + 1] += changeFromEnd;
        }
    }

    let numberOfShifts = 0;
    let result = "";

    const NUMBER_OF_ALPHABET: number = charCode('z') - charCode('a') + 1;

    for (let index = 0; index < s.length; index++) {
        numberOfShifts = (numberOfShifts + diffArray[index]) % NUMBER_OF_ALPHABET;
        if (numberOfShifts < 0) {
            numberOfShifts += NUMBER_OF_ALPHABET;
        }

        result = result +
            String.fromCharCode(
                charCode('a') +
                (charCode(s[index]) - charCode('a') + numberOfShifts) % NUMBER_OF_ALPHABET
            )
    }

    return result;
};

function charCode(char: string): number {
    if (char.length == 0 || char.length > 1) {
        throw new Error("char is not a single character")
    }
    return char.charCodeAt(0);
}
