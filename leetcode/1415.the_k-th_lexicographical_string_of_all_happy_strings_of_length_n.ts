function getHappyString(n: number, k: number): string {
    const happyStrings = generateHappyString("", n);

    if(k > happyStrings.length) {
        return "";
    } else {
        return happyStrings[k - 1]
    }
};

function generateHappyString(soFar: string, n: number): string[] {
    if(soFar.length === n) {
        return [soFar];
    }

    const length = soFar.length;

    switch(soFar[length - 1]) {
        case 'a':
            return [
                ...generateHappyString(soFar + 'b', n),
                ...generateHappyString(soFar + 'c', n)
            ];
        case 'b':
            return [
                ...generateHappyString(soFar + 'a', n),
                ...generateHappyString(soFar + 'c', n)
            ];
        case 'c':
            return [
                ...generateHappyString(soFar + 'a', n),
                ...generateHappyString(soFar + 'b', n)
            ];
        default:
            return [
                ...generateHappyString('a', n), 
                ...generateHappyString('b', n),
                ...generateHappyString('c', n)
            ];
    }
}
