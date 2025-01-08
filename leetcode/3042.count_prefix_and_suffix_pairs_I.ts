function countPrefixSuffixPairs(words: string[]): number {
    let count = 0;

    for(let i=0 ; i<words.length ; i++) {
        for(let j=i+1 ; j<words.length ; j++) {
            count += isPrefixAndSuffix(words[i], words[j]) ? 1 : 0;
        }
    }

    return count;
};

function isPrefixAndSuffix(word1: string, word2: string) {
    if(word2.length < word1.length) {
        return false;
    }

    for(let i=0 ; i<word1.length ; i++) {
        if(word1[i] != word2[i] || word1[i] != word2[word2.length - word1.length + i]) {
            return false;
        }
    }

    return true;
}
