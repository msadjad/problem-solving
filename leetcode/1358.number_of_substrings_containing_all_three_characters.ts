function numberOfSubstrings(s: string): number {
    const length = s.length;
    const As = new Array(length);
    const Bs = new Array(length);
    const Cs = new Array(length);

    let nextA = Infinity, nextB = Infinity, nextC = Infinity;
    for(let i=length-1 ; i >= 0 ; i--) {
        switch(s[i]) {
            case 'a': 
                nextA = i;
                break;
            case 'b':
                nextB = i;
                break;
            case 'c':
                nextC = i;
                break;
            default:
                throw new Error("character is not in the list");
        }

        As[i] = nextA;
        Bs[i] = nextB;
        Cs[i] = nextC;
    }

    let result = 0;
    let left = Math.min(Math.min(As[0], Bs[0]), Cs[0]);
    let right = Math.max(Math.max(As[0], Bs[0]), Cs[0]);

    while(left < right && right < length) {
        result += length - right;
        right = Math.max(Math.max(As[left+1], Bs[left+1]), Cs[left+1]);
        left = Math.min(Math.min(As[left+1], Bs[left+1]), Cs[left+1]);
    }
    
    return result;
};
