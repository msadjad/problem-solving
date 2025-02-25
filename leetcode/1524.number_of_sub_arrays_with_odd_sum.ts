function numOfSubarrays(arr: number[]): number {
    const MOD = 1e9 + 7;
    const length = arr.length;
    let count = 0, prefixSum = 0;
    let oddCount = 0, evenCount = 1;

    for(const num of arr) {
        prefixSum += num;

        if(prefixSum % 2 === 0) {
            count += oddCount;
            evenCount++;
        } else {
            count += evenCount;
            oddCount++;
        }

        count %= MOD;
    }

    return count;
};
