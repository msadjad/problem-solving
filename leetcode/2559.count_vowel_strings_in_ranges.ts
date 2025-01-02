function vowelStrings(words: string[], queries: number[][]): number[] {
    const validWordsSoFar = words.reduce((carry, word) => {
        const isWordValid = isValid(word) ? 1 : 0;
        carry.push(carry[carry.length - 1] + isWordValid);

        return carry;
    }, [0]);

    console.log(validWordsSoFar);

    return queries.map((query) => validWordsSoFar[query[1] + 1] - validWordsSoFar[query[0]]);
};

function isValid(word: string) {
    const vawels = ['a', 'e', 'i', 'o', 'u'];

    return vawels.includes(word[0]) && vawels.includes(word[word.length - 1]);
}
