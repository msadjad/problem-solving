function queryResults(limit: number, queries: number[][]): number[] {
    const colors = new Map<number, number>();
    const occurances = new Map<number, number>();

    const result = [];

    for(let i=0 ; i<queries.length ; i++) {
        const [ball, newColor] = queries[i];
        const previousColor = colors.get(ball);
        const previousCount = occurances.get(previousColor);

        if(previousColor != undefined) {
            if(previousCount == 1) {
                occurances.delete(previousColor);
            } else {
                occurances.set(previousColor, previousCount - 1);
            }
        }

        const newCount = occurances.get(newColor) ?? 0;
        occurances.set(newColor, newCount + 1)
        colors.set(ball, newColor)

        result.push(occurances.size)
    }

    return result;
};
