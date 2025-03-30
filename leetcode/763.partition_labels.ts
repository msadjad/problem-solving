function partitionLabels(s: string): number[] {
    const lastOccurances = new Map<string, number>();

    for(let i=s.length; i>=0; i--) {
        if(!lastOccurances.has(s[i])) {
            lastOccurances.set(s[i], i);
        }
    }   

    const charsLeft = new Set<string>();
    const breaks: number[] = [];

    for(let i=0; i<s.length; i++) {
        const lastOccurance = lastOccurances.get(s[i]);
        if(lastOccurance > i) {
            charsLeft.add(s[i])
        } else {
            charsLeft.delete(s[i]);
        }

        if(charsLeft.size === 0) {
            breaks.push(i) 
        }
    }

    const segments: number[] = [breaks[0] + 1];
    for(let i=1; i<breaks.length; i++) {
        segments.push(breaks[i] - breaks[i-1]);
    }

    return segments;
};
