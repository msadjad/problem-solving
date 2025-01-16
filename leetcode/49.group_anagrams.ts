function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, number[]>();

    for(let i=0 ; i<strs.length ; i++) {
        const hash = wordToHash(strs[i]);
        const group = groups.get(hash) ?? [];
        group.push(i);
        groups.set(hash, group);
    } 

    const result = [];

    for(const [hash, groupIndexes] of groups) {
        const group = [];
        for(let i=0 ; i<groupIndexes.length ; i++) {
            group.push(strs[groupIndexes[i]])
        }

        result.push(group)
    }

    return result;
};

function wordToHash(input: string) {
    const alphabetCount = (new Array(26)).fill(0);
    const FIRST_CHARACTER = 'a'.charCodeAt(0);
    
    for(let i=0 ; i<input.length ; i++) {
        alphabetCount[input[i].charCodeAt(0) - FIRST_CHARACTER] += 1;
    }

    let hashString = "";
    for(let i=0 ; i<26 ; i++) {
        if(alphabetCount[i]) {
            hashString += String.fromCharCode(FIRST_CHARACTER + i) + alphabetCount[i];
        }
    }

    return hashString;
}
