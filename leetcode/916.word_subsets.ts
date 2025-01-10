function wordSubsets(words1: string[], words2: string[]): string[] {
    const countedWords1 = words1.map(countLetters);
    const countedWords2 = words2.map(countLetters);

    const allSubSets = new Map<string, number>(); 

    for(let i=0 ; i<words2.length ; i++) {
        for(const [char, countInSubString] of countedWords2[i]) {
            const maxCountOfChar = allSubSets.get(char) ?? 0;
            allSubSets.set(char, Math.max(maxCountOfChar, countInSubString));
        }
    }

    let result = [];

    for(let i=0 ; i<words1.length ; i++) {
        let countSubStrings = 0;
        if(isSubString(countedWords1[i], allSubSets)) {
            result.push(words1[i]);
        }
    }

    return result;
};

function isSubString(word: Map<string, number>, substring: Map<string, number>) {
for(const [char, countInSubString] of substring) {
    const countInWords = word.get(char) ?? 0;

    if(countInWords < countInSubString) {
        return false;
    }
}

return true;
}

function countLetters(word: string) {
return word.split('').reduce((countMap, char) => {
    const count = countMap.get(char) ?? 0;
    countMap.set(char, count + 1);
    return countMap;
}, new Map<string, number>)
}