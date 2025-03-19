function minOperations(nums: number[]): number {
    let count = 0;
    for(let i=0; i<nums.length - 2; i++) {
        if(nums[i] === 0) {
            count += 1;
            for(let j=i; j<i+3; j++) {
                nums[j] = nums[j] === 0 ? 1 : 0;
            }
        }
    }

    if(nums[nums.length-1] === 0 || nums[nums.length-2] === 0) {
        return -1;
    }

    return count;
};
