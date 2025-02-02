function check(nums: number[]): boolean {
    let countNotIncrement = 0;
    for(let i=1 ; i<nums.length ; i++) {
        if(nums[i] < nums[i-1]) {
            countNotIncrement += 1;
        }
    }

    if(countNotIncrement === 1 && nums[nums.length - 1] > nums[0]) {
        return false;
    }

    return countNotIncrement <= 1;
};
