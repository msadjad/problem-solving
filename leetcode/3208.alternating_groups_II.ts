function numberOfAlternatingGroups(colors: number[], k: number): number {
    const length = colors.length;
    let count = 0;
    let results = 0;

    for (let i = 0; i < length + k - 2; i++) {  
        if (colors[i % length] !== colors[(i + 1) % length]) {  
            count += 1;
        } else {
            count = 0;
        }

        if (count >= k - 1) {
            results += 1;
        }
    }

    return results;
}
