function minimumLength(s: string): number {
    const charCount = new Map<string, number[]>();
    let countDeleted = 0;
    for(let i=0 ; i<s.length ; i++) {
        let accurances = charCount.get(s[i]) ?? [];

        accurances.push(i);
        if(accurances.length === 3) {
            countDeleted += 2; 
            accurances = [accurances[1]];
        }

        charCount.set(s[i], accurances);
    }   

    return s.length - countDeleted;
};
