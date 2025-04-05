function subsetXORSum(nums: number[]): number {
    const allSubsets = getAllSubsets(nums, 0, [[]]);

    let sum = 0;
    for(let i=0 ; i<allSubsets.length ; i++) {
        sum += allSubsets[i].reduce((carry, item) => carry ^ item, 0);
    }

    return sum;
};

function getAllSubsets(nums: number[], position: number, results: number[][]): number[][] {
    if(position === nums.length) {
        return results;
    }

    return getAllSubsets(
        nums,
        position + 1,
        [...results, ...results.map((result) => [...result, nums[position]])]
    );
}
