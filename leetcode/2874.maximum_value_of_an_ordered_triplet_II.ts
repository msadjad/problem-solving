function maximumTripletValue(nums: number[]): number {
    const length = nums.length;
    let max = 0, differenceMax = 0, iMax = 0;
    
    for (let k = 0; k < length; k++) {
        max = Math.max(max, differenceMax * nums[k]);
        differenceMax = Math.max(differenceMax, iMax - nums[k]);
        iMax = Math.max(iMax, nums[k]);
    }

    return max;
};
