function longestNiceSubarray(nums: number[]): number {
    let usedBits = 0;
    let start = 0, maxLength = 0;   

    for(let end = 0; end < nums.length; ++end) {
        while((usedBits & nums[end]) != 0) {
            usedBits ^= nums[start++];
        }

        usedBits |= nums[end];

        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
};
