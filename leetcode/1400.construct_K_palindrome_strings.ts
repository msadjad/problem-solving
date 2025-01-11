function canConstruct(s: string, k: number): boolean {
    const countedCharacters = s.split('').reduce((countedChars, char) => {
        const counted = countedChars.get(char) ?? 0;
        countedChars.set(char, counted + 1);
        return countedChars;
    }, new Map<string, number>);

    let [allCharacters, numberOfOdds] = [0, 0];
    for(const [_, count] of countedCharacters) {
        if(count % 2 != 0) {
            numberOfOdds += 1;
        } 

        allCharacters += count;
    }

    return (numberOfOdds <= k) && (allCharacters >= k);
}
