function countOfSubstrings(word: string, k: number): number {
    let numValidSubstrings = 0;
    let start = 0;
    let end = 0;
    
    const vowelCount = new Map<string, number>();
    let consonantCount = 0;
    
    const nextConsonant: number[] = new Array(word.length);
    let nextConsonantIndex = word.length;
    
    for (let i = word.length - 1; i >= 0; i--) {
        nextConsonant[i] = nextConsonantIndex;
        if (!isVowel(word[i])) {
            nextConsonantIndex = i;
        }
    }
    
    while (end < word.length) {
        const newLetter = word[end];
        
        if (isVowel(newLetter)) {
            vowelCount.set(newLetter, (vowelCount.get(newLetter) || 0) + 1);
        } else {
            consonantCount++;
        }
        
        while (consonantCount > k) {
            const startLetter = word[start];
            if (isVowel(startLetter)) {
                const count = vowelCount.get(startLetter)!;
                if (count === 1) {
                    vowelCount.delete(startLetter);
                } else {
                    vowelCount.set(startLetter, count - 1);
                }
            } else {
                consonantCount--;
            }
            start++;
        }

        while (start < word.length && vowelCount.size === 5 && consonantCount === k) {
            numValidSubstrings += nextConsonant[end] - end;
            
            const startLetter = word[start];
            if (isVowel(startLetter)) {
                const count = vowelCount.get(startLetter)!;
                if (count === 1) {
                    vowelCount.delete(startLetter);
                } else {
                    vowelCount.set(startLetter, count - 1);
                }
            } else {
                consonantCount--;
            }
            start++;
        }
        
        end++;
    }
    
    return numValidSubstrings;
}

function isVowel(c: string): boolean {
    return c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
}
