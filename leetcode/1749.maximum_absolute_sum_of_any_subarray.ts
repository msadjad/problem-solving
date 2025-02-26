function maxAbsoluteSum(nums: number[]): number {
    let minPrefixSum = Infinity, maxPrefixSum = -Infinity;
    let prefixSum = 0, maxAbsSum = 0;

    for(let i=0 ; i<nums.length ; i++) {
        prefixSum = nums[i] + prefixSum; 
        minPrefixSum = Math.min(prefixSum, minPrefixSum);
        maxPrefixSum = Math.max(prefixSum, maxPrefixSum);

        if(prefixSum >= 0) {
            maxAbsSum = Math.max(maxAbsSum, Math.max(prefixSum, prefixSum - minPrefixSum));
        } else if (prefixSum < 0) {
            maxAbsSum = Math.max(maxAbsSum, Math.max(Math.abs(prefixSum), Math.abs(prefixSum - maxPrefixSum)));
        }
    }

    return maxAbsSum;
};
