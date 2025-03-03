function pivotArray(nums: number[], pivot: number): number[] {
    const lessThanPivot = nums.filter((num) => num < pivot);
    const greaterThanPivot = nums.filter((num) => num > pivot);
    const equalToPivot = nums.filter((num) => num === pivot);


    return [...lessThanPivot, ...equalToPivot, ...greaterThanPivot];
};
