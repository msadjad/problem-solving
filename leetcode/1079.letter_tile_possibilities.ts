function numTilePossibilities(tiles: string): number {
    const letterCount = tiles.split("").reduce((count, char) => {
        count.set(char, (count.get(char) ?? 0) + 1);
        return count;
    }, new Map<string, number>());

    let result = 0;

    for(let length=1; length<=tiles.length ; length++) {
        const allPermutations = getAllPermutations(letterCount, length);
        result += allPermutations.size;
    }

    return result;
};

function getAllPermutations(letterCount: Map<string, number>, length: number): Set<string> {
    if(length === 0) {
        return new Set<string>([""])
    };

    const results = new Set<string>();

    const cloneLetterCount = new Map(letterCount);

    for(let [char, count] of letterCount) {
        if(count === 1) {
            cloneLetterCount.delete(char);
        } else {
            cloneLetterCount.set(char, count - 1);
        }

        const allPossibleStrings = getAllPermutations(cloneLetterCount, length - 1);

        for(const value of allPossibleStrings) {
            results.add(char + value)
        }
        cloneLetterCount.set(char, count);
    }

    return results;
}
