function stringMatching(words: string[]): string[] {
    const results = new Set<string>();

    for(let i=0 ; i<words.length ; i++) {
        for(let j=0 ; j<words.length; j++) {
            if(i != j && words[i].includes(words[j])) {
                results.add(words[j])
            }
        }
    } 

    return Array.from(results);
};
