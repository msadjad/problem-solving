function countInterestingSubarrays(nums: number[], modulo: number, k: number): number {
    const counts = new Map<number, number>();
    let result = 0;
    let prefix = 0;
    counts.set(0, 1);

    for(let i=0 ; i<nums.length ; i++) {
        prefix += nums[i] % modulo === k ? 1 : 0;
        result += counts.get((prefix - k + modulo) % modulo) || 0;
        counts.set(prefix % modulo, (counts.get(prefix % modulo) || 0) + 1);
    }

    return result;
};
