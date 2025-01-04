function countPalindromicSubsequence(s: string): number {
    const result = new Set<string>();
    const lastAccurance = new Map<string, number>();

    for(let i=0; i<s.length; i++) {
        if(lastAccurance.has(s[i])) {
            lastAccurance.set(s[i], i);
            continue;
        }

        lastAccurance.set(s[i], i);
    }

    for(let i=0; i<s.length; i++) {
        const last = lastAccurance.get(s[i]);
        if(last && last != i) {
            for(let j=i+1; j<last; j++) {
                const palindrom = `${s[i]}${s[j]}${s[i]}`;
                result.add(palindrom)
            }
        }
        lastAccurance.delete(s[i]);
    }

    return result.size;
};