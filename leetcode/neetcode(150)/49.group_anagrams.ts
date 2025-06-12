function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();
    for(let i=0 ; i<strs.length ; i++) {
        const sortedString = strs[i].split('')
                                .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
                                .join('');
        const group = groups.get(sortedString) || [];
        group.push(strs[i]);
        groups.set(sortedString, group);
    }

    return Array.from(groups.values());
};
