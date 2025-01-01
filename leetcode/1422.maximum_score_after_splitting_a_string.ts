function maxScore(s: string): number {
    const zerosFromLeft = (new Array(s.length)).fill(0);
    const onesFromRight = (new Array(s.length)).fill(0);

    zerosFromLeft[0] = valueToNumber(s[0], '0');
    for(let i = 1 ; i < s.length ; i++) {
        zerosFromLeft[i] += zerosFromLeft[i-1] + valueToNumber(s[i], '0');
    }

    onesFromRight[s.length - 1] = valueToNumber(s[s.length - 1], '1');
    for(let i = s.length - 2 ; i >= 0 ; i--) {
        onesFromRight[i] += onesFromRight[i + 1] + valueToNumber(s[i], '1');
    }

    let max = 0;
    for(let i = 1; i < s.length; i++){
        max = Math.max(onesFromRight[i] + zerosFromLeft[i - 1], max);
    }

    return max;
};

function valueToNumber(value: string, char: string) {
    return value === char ? 1 : 0; 
}

