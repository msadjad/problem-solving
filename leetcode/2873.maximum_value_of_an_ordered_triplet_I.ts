function maximumTripletValue(nums: number[]): number {
    const length = nums.length;
    let max = 0;

    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            for (let k = j + 1; k < length; k++) {
                max = Math.max(max, (nums[i] - nums[j]) * nums[k]);
            }
        }
    }

    return max;
};
