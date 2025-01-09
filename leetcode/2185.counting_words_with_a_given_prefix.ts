function prefixCount(words: string[], pref: string): number {
    return words.reduce((count, word) => { 
        return count + (isPrefix(word, pref) ? 1 : 0);
    }, 0)
};

function isPrefix(word: string, prefix: string): boolean {
    if(prefix.length > word.length) {
        return false;
    }

    return word.substring(0, prefix.length) === prefix;
}
