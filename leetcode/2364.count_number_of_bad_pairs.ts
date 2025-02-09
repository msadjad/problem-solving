function countBadPairs(nums: number[]): number {
    const offsets = new Map<number, number>();

    for(let i=0 ; i<nums.length ; i++) {
        const diff = nums[i] - i;
        const current = offsets.get(diff) ?? 0;
        offsets.set(diff, current + 1)
    }

    let allBads = (nums.length * (nums.length - 1))/2;

    for(const [key, value] of offsets) {
        allBads -= (value * (value - 1))/2
    }

    return allBads;
};
