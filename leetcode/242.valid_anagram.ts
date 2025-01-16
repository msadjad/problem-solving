function isAnagram(s: string, t: string): boolean {
    const map = new Map<string, number>();   

    for(let i=0 ; i<s.length ; i++) {
        const value = map.get(s[i]) ?? 0;
        map.set(s[i], value + 1);
    }

    for(let i=0 ; i<t.length ; i++) {
        const value = map.get(t[i]);
        if(value === undefined || value === 0) {
            return false;
        }

        map.set(t[i], value - 1);
    }

    return s.length === t.length;
};
