function applyOperations(nums: number[]): number[] {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1]) {
            nums[i] *= 2;
            nums[i + 1] = 0;
        }
    }

    const nonZeros = nums.filter((num) => num != 0);
    const zeros = nums.filter((num) => num === 0);

    return [...nonZeros, ...zeros]
};
