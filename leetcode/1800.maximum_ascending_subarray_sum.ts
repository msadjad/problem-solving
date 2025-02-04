function maxAscendingSum(nums: number[]): number {
    let previousSum = nums[0]; 
    let max: number = nums[0];
    
    for(let i=1 ; i<nums.length ; i++) {
        let newSum = nums[i];

        if(nums[i - 1] < nums[i]) {
            newSum += previousSum;
        }

        previousSum = newSum;
        max = Math.max(newSum, max);
    }

    return max;
};
