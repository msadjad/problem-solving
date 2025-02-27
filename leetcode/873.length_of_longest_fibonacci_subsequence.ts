function lenLongestFibSubseq(arr: number[]): number {
    let maxFibonnaci = 0;
    const allNumbers = arr.reduce((allNumbers, number) => allNumbers.add(number), new Set<number>());

    for(let i=0 ; i<arr.length ; i++) {
        let currentFibonnaci = 0;
        for(let j=1 ; j<arr.length ; j++) {
            if(arr[i] >= arr[j]) {
                continue;
            }

            let [first, second] = [arr[i], arr[j]];

            if(allNumbers.has(first + second)) {
                currentFibonnaci = 2;
            } 

            while(allNumbers.has(first + second)) {
                currentFibonnaci += 1;
                [first, second] = [second, first + second];
            }

            maxFibonnaci = Math.max(currentFibonnaci, maxFibonnaci);
        }
    }

    return maxFibonnaci;
};
