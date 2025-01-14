enum state {
    first = 'FIRST',
    second = 'SECOND',
    both = 'BOTH'
};

function findThePrefixCommonArray(A: number[], B: number[]): number[] {
    const usedNumbers = new Map<number, state>();
    let countBoth = 0;
    const response = [];
    for(let i=0 ; i<A.length ; i++) {
        const aValue = usedNumbers.get(A[i]);
        const bValue = usedNumbers.get(B[i]);

        let isBoth = false;

        if(!aValue) {
            usedNumbers.set(A[i], state.first);
        }
        if(!bValue) {
            usedNumbers.set(B[i], state.second);
        }

        if(aValue === state.second) {
            countBoth += 1;
            usedNumbers.set(A[i], state.both);
            isBoth = true;
        } 

        if( bValue === state.first) {
            countBoth += 1;
            usedNumbers.set(B[i], state.both);
            isBoth = true;
        } 

        if(A[i] === B[i]) {
            countBoth += 1;
            usedNumbers.set(B[i], state.both);
            isBoth = true;
        }

        response.push(countBoth);
    }

    return response;
};
