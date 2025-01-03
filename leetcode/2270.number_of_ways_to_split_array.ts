function waysToSplitArray(nums: number[]): number {
    const sumFromStart = (new Array(nums.length + 1)).fill(0);
    for(let i = 0 ; i < nums.length ; i++) {
        sumFromStart[i + 1] = sumFromStart[i] + nums[i];
    } 

    const sumFromEnd = (new Array(nums.length + 1)).fill(0);
    for(let i = nums.length - 1; i >= 0 ; i--) {
        sumFromEnd[i] = sumFromEnd[i+1] + nums[i];
    }

    console.log(sumFromStart, sumFromEnd);

    let numberOfValidSplits = 0;
    for(let i=1 ; i<nums.length ; i++) {
        if(sumFromStart[i] >= sumFromEnd[i]) {
            numberOfValidSplits += 1;
        }
    }

    return numberOfValidSplits;
};
