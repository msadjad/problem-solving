function areAlmostEqual(s1: string, s2: string): boolean {
    if(s1.length != s2.length) return false;

    let differencesS1:string[] = [];
    let differencesS2:string[] = [];

    for(let i=0 ; i<s1.length ; i++) {
        if(s1[i] != s2[i]){
            differencesS1.push(s1[i]);
            differencesS2.push(s2[i]);
        }
    }

    differencesS1 = differencesS1.sort();
    differencesS2 = differencesS2.sort();

    return differencesS1.length <= 2 && differencesS2.length <= 2 
        && differencesS1[0] === differencesS2[0] 
        && differencesS1[1] === differencesS2[1];
};
