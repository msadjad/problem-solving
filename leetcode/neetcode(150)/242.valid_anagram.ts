// Solution 1: Sorting Complexity: O(nlogn)
// function isAnagram(s: string, t: string): boolean {
//     const sSorted = s.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('');
//     const tSorted = t.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('');

//     return sSorted === tSorted;
// };

// Solution 2: Hash Table Complexity: O(n)
function isAnagram(s: string, t: string): boolean {
    if(s.length !== t.length) {
        return false;
    }

    const sMap = new Map<string, number>();
    const tMap = new Map<string, number>();

    for(let i=0 ; i<s.length; i++) {
        sMap.set(s[i], (sMap.get(s[i]) || 0) + 1);
    }

    for(let i=0 ; i<t.length; i++) {
        tMap.set(t[i], (tMap.get(t[i]) || 0) + 1);
    }

    for(let [key, value] of sMap) {
        if(tMap.get(key) !== value) {
            return false;
        }
    }

    return true;
}