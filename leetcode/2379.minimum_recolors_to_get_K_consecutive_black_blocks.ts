function minimumRecolors(blocks: string, k: number): number {
    const whiteCount: number[] = [];
    let countWhites = 0;
    
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === 'W') {
            countWhites += 1;
        }
        whiteCount.push(countWhites);
    }
    
    let min = whiteCount[k - 1];
    
    for (let i = 0; i + k < blocks.length; i++) {
        min = Math.min(min, whiteCount[i + k] - whiteCount[i]);
    }
    
    return min;
}
